import React, { useEffect, useMemo, useCallback } from "react";
import ErrorPage from 'next/error'


import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Link from "next/link";

import styled from 'styled-components';
import _ from 'lodash';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Hidden from '@material-ui/core/Hidden';

import { Breadcrumbs } from "../../components";
import { BACKEND } from '../../libs/config';
import { getDate } from '../../libs/utils';
import { getPostAndMorePosts, getPosters } from '../api/index';

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
   .groupBanner {
    padding: 2rem;
    display: flex;
    justify-content: center;
    }
   .post_info {
     margin: 1rem 0;
     h1 {
       font-size: 27.2px;
     }
     .tags {
       border-bottom: 1px solid #EEEEEE;
       margin-bottom: 1rem;
       padding-bottom: 1rem;
     }
     i {
       font-weight: 500;
     }
   }
   .date {
     display: inline-flex;
     align-items: center;
   }
   margin-bottom: 2rem;
   @media (max-width: 600px) {
    .post_info {
      h1 {
        font-size: 22.4px;
      }
    }
   }
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
function Post({ posters, post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const { slug, Trang } = router.query;
  const tieuDe = post ? post.tieuDe : "";
  const mota = post ? post.mota : "";
  const groupBanner = posters?.groupbanner?.url ?? "";

  const render = useMemo(() => {
    if (post) return { __html: post.noiDung };
  }, [post]);
  const slugNTitle = [
    { slug: `/giam-gia`, title: 'Điểm đến'},
    { title: tieuDe },
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
      <Hidden smDown>
          <div  className="groupBanner">
              <img src={`${baseUrl}${groupBanner}`} alt="group-banner" width="100%"/>
          </div>
      </Hidden>
      <BlogStyles>
      <Breadcrumbs slugNTitle={slugNTitle} />
        <div className="post_info">
          <h1>{tieuDe}</h1>
          <div className="tags">
            {post && post.tags ? (
              post.tags.map(({ tagName }, id) => <Link key={id} href="/"><a style={{
                fontWeight: '500',
                marginRight: '4px',
                color: 'grey',
                fontSize: '12px'
              }}>#{tagName}</a></Link>)
            ) : null }
            <span className="date"><AccessTimeIcon style={{
              fontSize: '12px'
            }}/><span>{getDate(post?.published_at)}</span></span>
          </div>
          <div>
            <i>{`"${mota}"`}</i>
          </div>
        </div>
        <div className='post-content'
          dangerouslySetInnerHTML={render}
        />
      </BlogStyles>
    </Wrapper>
  );
};

Post.getInitialProps = async (ctx) => {
  const data = await getPostAndMorePosts(ctx.query.slug);
  const posters = await getPosters();
  return {
    post: {
      ...data?.baiViets[0],
    },
    posters
  }
}

export default Post;
