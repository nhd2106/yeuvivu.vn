import React, { useEffect, useMemo } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";


import styled from 'styled-components';
import { Container } from "@material-ui/core";


import { handlerGetPostDetails } from "../../redux/actions/blog";
import { Breadcrumbs } from "../../components/";
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
  `
 const BlogStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
  iframe {
    width: 100%;
  }
  .post-content{
    width: 80%;
    margin: auto;
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


export default function Post() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const postDetails = useSelector(({ blog }) => blog.postDetails);
  const title = postDetails ? postDetails.title : "";

  const { url } = postDetails && postDetails.og_image ? postDetails.og_image : "";
  useEffect(() => {
    dispatch(handlerGetPostDetails(slug));
  }, [slug]);
  const render = useMemo(() => {
    if (postDetails) return { __html: postDetails.content };
  }, [postDetails]);
  const slugNTitle = [
    { slug: "/trai-nghiem", title: "Trải nghiệm" },
    { slug: `/${slug}`, title },
  ];
  const baseUrl = BACKEND();
  const coverUrl = url ? `${baseUrl}${url}` : "";
  const SEO = {
    title: postDetails ? postDetails.title : '',
  };
  return (
    <Wrapper>
      <NextSeo {...SEO}/>

      <BlogStyles>
      <Breadcrumbs slugNTitle={slugNTitle} />

        {coverUrl ? (
          <BlogCover className="cover-style">
            <img src={coverUrl}/>
            <div className="banner">
              <h1>{title}</h1>
            </div>
          </BlogCover>
        ) : null}

        <div className='post-content'
          dangerouslySetInnerHTML={render}
        />
      </BlogStyles>
    </Wrapper>
  );
}
