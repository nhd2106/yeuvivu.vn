import React, { useEffect, useMemo, useCallback } from "react";
import ErrorPage from 'next/error'


import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";


import styled from 'styled-components';
import _ from 'lodash';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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


 function Post({ preview, post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const dispatch = useDispatch();
  const { slug, Trang } = router.query;
  const tieuDe = post ? post.tieuDe : "";
  useEffect(() => {
    const theLoai = Trang;
    if(theLoai && slug) {
      dispatch(handlerGetPostDetails(slug, theLoai));
    }
  }, [slug, Trang]);
  const render = useMemo(() => {
    if (post) return { __html: post.noiDung };
  }, [post]);
  const slugNTitle = [
    { slug: 'giam-gia', title: 'Giảm giá'},
    {  title: tieuDe },
  ];
  const baseUrl = BACKEND();
  const imageSeo = post && post.anhGioiThieu ? post.anhGioiThieu.url : '';
  const SEO = {
    title: post ? post.tieuDe : '',
    openGraph: {
      title: post ? post.tieuDe : '',
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
    <Wrapper className="container1">
      <NextSeo {...SEO}/>
      <BlogStyles>
      <Breadcrumbs slugNTitle={slugNTitle} />
        <div className="post_info">
          <h1>{tieuDe}</h1>
          <div>
            {post && post.tags ? (
              post.tags.map(({ tagName }, id) => <Link key={id} href="/"><a style={{
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
            }}/><span>{post && post.published_at}</span></span>
          </div>
        </div>
        <div className='post-content'
          dangerouslySetInnerHTML={render}
        />
      </BlogStyles>
    </Wrapper>
  );
}
Post.getInitialProps = async (ctx) => {
  console.log(ctx.query.slug);
  const data = await getPostAndMorePosts(ctx.query.slug);

  return {
    post: {
      ...data?.baiViets[0],
    },
  }
}

export default Post;

// export async function getStaticProps({ params, preview = null }) {
//   const data = await getPostAndMorePosts(params.slug, preview);

//   return {
//     props: {
//       preview,
//       post: {
//         ...data?.baiViets[0],
//       },
//     },
//   }
// }


// export async function getStaticPaths() {
//   const allPosts = await getAllPostsWithSlug();
//   return {
//     paths: allPosts?.map((post) => `/giam-gia/${post.slug}`) || [],
//     fallback: true,
//   }
// }