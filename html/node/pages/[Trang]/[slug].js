import React, { useEffect, useMemo, useCallback } from "react";
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
 const BlogCover = styled.div`
 position: relative;
  img {
    height: 30vw;
    object-fit: cover;
    width: 100%;
    vertical-align: middle;
  }
  .banner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 70%;
    h1 {
      color: white;
    }
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
  const dispatch = useDispatch();
  const { slug, Trang } = router.query;
  const postDetails = useSelector(({ blog }) => blog.postDetails);
  const tieuDe = postDetails ? postDetails.tieuDe : "";
  const { url } = postDetails && postDetails.og_image ? postDetails.og_image : "";
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
  const coverUrl = url ? `${baseUrl}${url}` : "";
  const SEO = {
    title: postDetails ? postDetails.tieuDe : '',
  };
  // console.log(seo);
  return (
    <Wrapper className="container">
      <NextSeo {...SEO}/>

      <BlogStyles>
      <Breadcrumbs slugNTitle={slugNTitle} />

        {coverUrl ? (
          <BlogCover className="cover-style">
            <img src={coverUrl}/>
            <div className="banner">
              <h1>{tieuDe}</h1>
            </div>
          </BlogCover>
        ) : null}
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
