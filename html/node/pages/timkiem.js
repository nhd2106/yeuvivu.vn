import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import _ from 'lodash';
import { NextSeo } from 'next-seo';



import {
    Breadcrumbs,
    Typography,
    Button,
    Grid,
    Hidden,
    Box
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import {
    getPostByType,
    getPosters,
    countPostsByType,
    getAllSearchPosts
} from './api';
import { BACKEND } from '../libs/config';
import { getDate } from '../libs/utils';


const Wrapper = styled.div`
    .titleNBreadCrumbs {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        h3 {
            margin-bottom: 1rem;
        }
    }
    .groupBanner {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }
    .where {
      display: flex;
      justify-content: center;
    }
    .top2_image {
      width: 100%;
      height: 35vh;
    }
    .top4_image {
      width: 100%;
      height: 20vh;
    }
    @media (max-width: 768px) {
      .top2_image {
        height: 20vh;
      }
    }
    @media (max-width: 600px) {
      .top2_image {
        height: 18vh;
      }
      .top4_image {
        height: 18vh;
      }
    }
`;
const News = styled.div`

  margin-top: 1rem;
  .homenews_title {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 0;
  }
  .homenews_title:before {
    content: "";
    display: inline-flex;
    background-color: #f4ae15;
    border-left-width: 15px;
    width: 7px;
    height: 25px;
    transform: skew(-20deg);
    margin-right: 1rem;
  }
  .homenews_title:after {
    content: "";
    display: table;
    clear: both;
  }
  .news_item {
    @media (max-width: 600px) {
      height: 210px;
    }
    padding-bottom: 1rem;
    margin: 1rem 0;
    border-bottom: 1px solid #eee;
    img {
      border-radius: 4px;
    }
    .item_image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-width: 100%;
      object-position: center;
    }
  }
  .isfloating {
    position: fixed;
    top: 15%;
    bottom: 426px;
  }
  .item_desc {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .loadmore {
    display: flex;
    justify-content: center;
  }
  @media (max-width: 599px) {
    .news_item {
      .item_image {
        height: 130px;
      }
    }
    .item_desc {
      font-size: 14px;
      line-height: 1.4;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
  @media (min-width: 600px) {
    .item_desc {
      font-size: 16px;
      line-height: 1.4;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
 
`;

const Trang = ({ posts, posters, allPosts: initialNumPosts, searchkey }) => {
    const baseUrl = BACKEND();
    const router = useRouter();
    const title = "tìm kiếm";

    const ads1 = posters?.ads1?.url ?? "";
    const ads2 = posters?.ads2?.url ?? "";
    const groupBanner = posters?.groupbanner?.url ?? "";

    const filterPosts = () => {
        if (posts) {
            return posts.filter(({
                tieuDe,
                mota,
                mien: {
                    ten
                },
                the_loai: { name },
            }) => (
                tieuDe.toLowerCase().includes(searchkey) || mota?.toLowerCase().includes(searchkey) 
            ))
        };
        return null;

    }

    const imageSeo = posts[0]?.anhGioiThieu?.url
    const SEO = {
        title,
        keywords: 'keywords',
        description: '',
        openGraph: {
            title,
            type: 'Blog',
            locale: 'vi_VN',
            url: `https://yeuvivu.vn${router.asPath}`,
            site_name: 'yeuvivu',
            images: [
                {
                    url: `https://yeuvivu.vn:1337${imageSeo}`,
                    width: 800,
                    height: 600,
                    alt: 'yeuvivu-diemden',
                },
            ],
        }
    }

    return (
        <Wrapper className="container">
            <NextSeo {...SEO} />
            <Hidden smDown>
                <div className="groupBanner">
                    <img src={`${baseUrl}${groupBanner}`} alt="group-banner" width="100%" />
                </div>
            </Hidden>
            <div className="titleNBreadCrumbs">
                <h2>{title}</h2>
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link href="/">
                            <a>Trang chủ</a>
                        </Link>
                        <Typography color="textPrimary">{title}</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <News>
                <Grid container spacing={2}>
                    <Grid item sm={9} xs={12}>
                        <div className="homenews_title">
                            <h3>Tin dành cho bạn</h3>
                        </div>
                        <div className="news_list">
                            { filterPosts().length ? _.map(filterPosts(), ({
                                tieuDe,
                                anhGioiThieu,
                                slug,
                                tags,
                                published_at,
                                mota,
                                the_loai
                            }) => {
                                const { name } = the_loai || '';
                                return (
                                    <div key={slug}>
                                        <span>
                                            <Box className="news_item " >
                                                <Hidden smUp>
                                                    <Link href={`/${name}/${slug}`} >
                                                        <a>
                                                            <h3>{tieuDe}</h3>
                                                        </a>
                                                    </Link>
                                                </Hidden>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={7} sm={4}>
                                                        <div>
                                                            <Link href={`/${name}/${slug}`}>
                                                                <a>
                                                                    <img className="item_image" src={anhGioiThieu ? `${baseUrl}${anhGioiThieu.url}` : ''} alt="sdsdsd" />
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={5} sm={8}>
                                                        <Hidden only={['xs']}>
                                                            <Link href={`/${name}/${slug}`}>
                                                                <a>
                                                                    <h3>{tieuDe}</h3>
                                                                </a>
                                                            </Link>
                                                        </Hidden>
                                                        <div>Ngày đăng: {getDate(published_at)}</div>
                                                        <div className="item_desc">{mota}</div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </span>
                                    </div>
                                )
                            }) : null}
                        </div>
                    </Grid>
                    <Hidden smDown>
                        <Grid item sm={3} xs={12}>
                            <div>
                                <div
                                    className="right_topBanner"
                                    style={{
                                        marginBottom: '3rem'
                                    }}
                                >
                                    <img src={`${baseUrl}${ads1}`} alt="lien-he-quang-cao-yeu-vivu" width="100%" />
                                </div>
                                <div
                                // className={`right_topBanner ${is_floating ? 'isfloating' : ''}`}
                                >
                                    <img src={`${baseUrl}${ads2}`} alt="lien-he-quang-cao-yeu-vivu" width="100%" />
                                </div>
                            </div>
                        </Grid>
                    </Hidden>
                </Grid>
            </News>
        </Wrapper>
    );
};

Trang.propTypes = {};

Trang.getInitialProps = async (ctx) => {
    const searchkey = ctx?.query?.key.toLowerCase();
    const posters = await getPosters();
    const allPosts = await countPostsByType("diem-den");
    const posts = await getAllSearchPosts();
    return {
        posts: _.reverse(_.orderBy(posts, ['published_at'])),
        posters,
        allPosts,
        searchkey
    }
}

export default Trang;

