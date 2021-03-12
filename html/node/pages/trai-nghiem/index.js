import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { NextSeo } from "next-seo";

import MediaCard from "../../components/Card";
import styled from 'styled-components';
import TraiNgiemSVG from './svg';
import { BACKEND } from '../../libs/config';


import { handlerGetPosts } from "../../redux/actions/blog";

export const TraiNghiemStyles = styled.div`
  min-height: 76vh;
  width: 90%;
  margin: 3rem auto;
  .top-images {
    height: 100%;
    width: 100%;
    min-height: 76vh;
    display: flex;
    alig-items: center;
    .text {
      flex: 1 1 40rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }

    .image {
      flex: 4 1 100rem;
      // background: url("/trainghiemimages.jpg");
      // width: 100%;
      // height: 100%;
      // background-position: center;
      // background-size: cover;
      // background-repeat: no-repeat;
      // min-height: 76vh;
      svg {
        width: 100%;
      }
    }
    margin-bottom: 7rem;
  }
  .card-wrapper {
    margin-top: 5rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  .MuiTypography-h5,
  .MuiTypography-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .MuiCardHeader-content {
    overflow: hidden;
  }
  @media screen and (max-width: 599px) {
    margin: 3rem auto;
    .card-wrapper {
      grid-template-columns: repeat(1, 1fr);
    }
    .top-images {
      flex-direction: column;
      min-height: 50vh;
      margin-bottom: 3rem;

      .text,
      .image {
        flex: unset;
      }
      svg {
        height: 15rem;
      }
    }
  }
  @media screen and (min-width: 600px, max-width: 1024px) {
    .card-wrapper {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export default function TraiNghiem(props) {
  const posts = useSelector(({ blog }) => blog.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handlerGetPosts());
  }, []);
  const SEO = {
    title: "Trải nghiệm",
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const baseUrl = BACKEND();
  return (
    <>
      <NextSeo {...SEO} />
      <TraiNghiemStyles>
        <div className="top-images">
          <div className="text">
            <h1>Lux Journey Trải nghiệm</h1>
            <p>Bọn mình đến đến, bọn mình trải nghiệm, bọn mình chia sẻ ^^.</p>
          </div>
          <div className="image">
            <TraiNgiemSVG/>
          </div>
        </div>
        <div></div>
        <h2>Phú Quốc nè</h2>

        {/* <div className="card-wrapper">
        {posts
          ? posts.map((post) => {
              const {
                og_image: { url },
                id,
                title,
                shortDesc,
              } = post || "";
              return (
                <MediaCard
                  image={`http://localhost:1337${url}`}
                  title={title}
                  description={shortDesc}
                  id={id}
                />
              );
            })
          : null}
      </div> */}
        <div style={{ marginBottom: "3rem" }}>
          {posts ? (
            <Slider {...settings}>
              {posts.map((post) => {
                const {
                  og_image,
                  title,
                  shortDesc,
                  slug
                } = post || "";
                const { url } = og_image || ''
                return (
                  <MediaCard
                    key={slug}
                    image={`${baseUrl}${url}`}
                    title={title}
                    description={shortDesc}
                    slug={slug}
                  />
                );
              })}
            </Slider>
          ) : null}
        </div>
        <h2>Đà Lạt</h2>
        <div style={{ marginBottom: "3rem" }}>
          {posts ? (
            <Slider {...settings}>
              {posts.map((post) => {
                const {
                  og_image,
                  title,
                  shortDesc,
                  slug
                } = post || "";
                const { url } = og_image || '';
                return (
                  <MediaCard
                    key={slug}
                    image={`${baseUrl}${url}`}
                    title={title}
                    description={shortDesc}
                    slug={slug}
                  />
                );
              })}
            </Slider>
          ) : null}
        </div>
        <h2>Nha Trang</h2>
        <div style={{ marginBottom: "3rem" }}>
          {posts ? (
            <Slider {...settings}>
              {posts.map((post) => {
                const {
                  og_image,
                  slug,
                  title,
                  shortDesc,
                } = post || "";
                const { url } = og_image || '';
                return (
                  <MediaCard
                    image={`${baseUrl}${url}`}
                    title={title}
                    description={shortDesc}
                    slug={slug}
                    key={slug}
                  />
                );
              })}
            </Slider>
          ) : null}
        </div>
        <h2>Đà Lạt</h2>
        <div style={{ marginBottom: "3rem" }}>
          {posts ? (
            <Slider {...settings}>
              {posts.map((post) => {
                const {
                  og_image,
                  slug,
                  title,
                  shortDesc,
                } = post || "";
                const { url } = og_image || '';
                return (
                  <MediaCard
                    key={slug}
                    image={`${baseUrl}${url}`}
                    title={title}
                    description={shortDesc}
                    slug={slug}
                  />
                );
              })}
            </Slider>
          ) : null}
        </div>
      </TraiNghiemStyles>
    </>
  );
}
