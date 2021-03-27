import React, { useEffect, useMemo, useCallback } from "react";
import ErrorPage from "next/error";

import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Link from "next/link";

import styled from "styled-components";
import _ from "lodash";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Facebook from "@material-ui/icons/Facebook";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";

import { Breadcrumbs } from "../../components";
import { BACKEND } from "../../libs/config";
import { getDate } from "../../libs/utils";
import { getPostAndMorePosts, getPosters, getLinksAndPhone } from "../api/index";

const Wrapper = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #eeeeee;
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
    i {
      font-weight: 500;
    }
  }
  .shareButtons {
    border-bottom: 1px solid #eeeeee;
    margin: 1rem 0;
    padding-bottom: 1rem;
  }
  .bottomShareButtons {
    margin: 1rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eeeeee;
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
  .consultance {
    line-height: 2rem;
    h2 {
      font-size: 28px;
    }
    display: flex;
    flex-direction: column;
    .contact {
      color: #555555;
      font-weight: bold;
      a {
        color: #ff5852;
        font-weight: normal;
      }
    }
    margin-bottom: 1rem;
  }
`;
const BlogStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
  iframe {
    width: 100%;
  }
`;
function Post({ posters, post, linksAndPhone }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const { slug, Trang } = router.query;
  const tieuDe = post ? post.tieuDe : "";
  const mota = post ? post.mota : "";
  const groupBanner = posters?.groupbanner?.url ?? "";
  const tu_van_poster = posters?.tu_van_poster?.url ?? "";

  const render = useMemo(() => {
    if (post) return { __html: post.noiDung };
  }, [post]);
  const slugNTitle = [
    { slug: `/am-thuc`, title: "Ẩm thực" },
    { title: tieuDe },
  ];
  const baseUrl = BACKEND();
  const imageSeo = post && post.anhGioiThieu ? post.anhGioiThieu.url : "";
  const SEO = {
    title: post ? post.tieuDe : "",
    openGraph: {
      title: post ? `Yêu vivu | ${post.tieuDe}` : "",
      type: "Blog",
      locale: "vi_VN",
      url: `https://yeuvivu.vn${router.asPath}`,
      site_name: "yeuvivu",
      images: [
        {
          url: `https://yeuvivu.vn:1337${imageSeo}`,
          width: 800,
          height: 600,
          alt: "Og Image Alt",
        },
      ],
    },
  };
  return (
    <Wrapper className="container1">
      <NextSeo {...SEO} />
      <Hidden smDown>
        <div className="groupBanner">
          <img
            src={`${baseUrl}${groupBanner}`}
            alt="group-banner"
            width="100%"
          />
        </div>
      </Hidden>
      <BlogStyles>
        <Breadcrumbs slugNTitle={slugNTitle} />
        <div className="post_info">
          <h1>{tieuDe}</h1>
          <div className="tags">
            {post && post.tags
              ? post.tags.map(({ tagName }, id) => (
                  <Link key={id} href="/">
                    <a
                      style={{
                        fontWeight: "500",
                        marginRight: "4px",
                        color: "grey",
                        fontSize: "12px",
                      }}
                    >
                      #{tagName}
                    </a>
                  </Link>
                ))
              : null}
            <span className="date">
              <AccessTimeIcon
                style={{
                  fontSize: "12px",
                }}
              />
              <span>{getDate(post?.published_at)}</span>
            </span>
          </div>
          <div className="shareButtons">
            <Button
              startIcon={<Facebook />}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=https://yeuvivu.vn${router.asPath}`,
                  "MsgWindow",
                  "width=600,height=800"
                );
              }}
            >
              chia sẻ
            </Button>
          </div>
          <div>
            <i>{`"${mota}"`}</i>
          </div>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={render} />
        <div className="bottomShareButtons">
          <Button
            startIcon={<Facebook />}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=https://yeuvivu.vn${router.asPath}`,
                "MsgWindow",
                "width=600,height=800"
              );
            }}
          >
            chia sẻ
          </Button>
        </div>
        <div className="consultance">
              <h2>Liên hệ tư vấn</h2>
              <p>Tư vấn thiết kế lịch trình du lịch, đặt phòng</p>
              <p className="contact">Hotline: <a href={`tel:0${linksAndPhone?.phone}`}>0{linksAndPhone?.phone}</a></p>
              <p className="contact">Fanpage: <a href={linksAndPhone?.facebook ?? ""} target="_blank">Yêu vivu</a></p>
              <p className="contact">Instagram: <a href={linksAndPhone?.instagram ?? ""} target="_blank">Yêu vivu</a></p>
              <img  src={`${baseUrl}${tu_van_poster}`} />
        </div>
      </BlogStyles>
    </Wrapper>
  );
}

Post.getInitialProps = async (ctx) => {
  const data = await getPostAndMorePosts(ctx.query.slug);
  const posters = await getPosters();
  const linksAndPhone = await getLinksAndPhone();
  return {
    post: {
      ...data?.baiViets[0],
    },
    posters,
    linksAndPhone
  }
};

export default Post;
