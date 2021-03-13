import React, { useEffect, useMemo, useCallback } from "react";
import ErrorPage from 'next/error'


import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";


import styled from 'styled-components';
import _ from 'lodash';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { handlerGetPostDetails } from "../../redux/actions/blog";
import { Breadcrumbs } from "../../components";
import { BACKEND } from '../../libs/config';
import { getAllPostsWithSlug, getPostAndMorePosts, getAllPostsForHome } from '../api/index';

  const Wrapper = styled.div`
    .cover-style:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,.5);
   }
   .post_info {
     padding: 2rem 0;
   }
   margin-bottom: 2rem;
  `
 const BlogStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
  iframe {
    width: 100%;
  }
`;

const pageTitleMapping = {
  ["diem-den"]: "Điểm đến",
  ["giam-gia"]: "Giảm giá",
  ["lich-trinh"]: "Lịch trình",
  ["am-thuc"]: "Ẩm thực",
  ["review"]: "Review",
};


export default function Post() {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const dispatch = useDispatch();
  const { slug, Trang } = router.query;
  const postDetails = useSelector(({ blog }) => blog.postDetails);
  const tieuDe = postDetails ? postDetails.tieuDe : "";
  useEffect(() => {
    const theLoai = Trang;
    if(theLoai && slug) {
      dispatch(handlerGetPostDetails(slug, theLoai));
    }
  }, [slug, Trang]);
  const render = useMemo(() => {
    if (postDetails) return { __html: postDetails.noiDung };
  }, [postDetails]);
  const slugNTitle = [
    { slug: `/${Trang}`, title: pageTitleMapping[Trang]},
    { slug: `/${slug}`, title: tieuDe },
  ];
  const baseUrl = BACKEND();
  const imageSeo = postDetails && postDetails.anhGioiThieu ? postDetails.anhGioiThieu.url : '';
  const SEO = {
    title: postDetails ? postDetails.tieuDe : '',
    openGraph: {
      title: postDetails ? postDetails.tieuDe : '',
      type: 'Blog',
      locale: 'vi_VN',
      url: `https://yeuvivu.vn${router.asPath}`,
      site_name: 'yeuvivu',
      images: [
        {
          url: `https://yeuvivu.vn:1337${imageSeo}`,
          width: 800,
          height: 600,
          alt: 'Og Image Alt',
        },
      ],
    }
  };
  return (
    <Wrapper className="container">
      <NextSeo {...SEO}/>
      <BlogStyles>
      <Breadcrumbs slugNTitle={slugNTitle} />
        <div className="post_info">
          <h1>{tieuDe}</h1>
          <div>
            {postDetails && postDetails.tags ? (
              postDetails.tags.map(({ tagName }, id) => <Link key={id} href="/"><a style={{
                fontWeight: '500',
                marginRight: '4px',
                color: 'grey',
                fontSize: '12px'
              }}>#{tagName}</a></Link>)
            ) : null }
            <span style={{
              fontSize: '12px'
            }}><AccessTimeIcon style={{
              fontSize: '12px'
            }}/><span>{postDetails && postDetails.published_at}</span></span>
          </div>
        </div>
        <div className='post-content'
          dangerouslySetInnerHTML={render}
        />
      </BlogStyles>
    </Wrapper>
  );
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  // const content = await markdownToHtml(data?.posts[0]?.content || '')

  return {
    props: {
      preview,
      post: {
        ...data?.posts[0],
        // content,
      },
      morePosts: data?.morePosts,
    },
  }
}


export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map((post) => `/baiViets/${post.slug}`) || [],
    fallback: true,
  }
}