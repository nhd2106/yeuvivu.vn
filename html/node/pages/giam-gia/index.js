import React, { useEffect, useState } from "react";
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
  countPostsByType
} from '../api';
import { BACKEND } from '../../libs/config';
import { getDate } from '../../libs/utils';


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
const Homenews = styled.div`

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
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const Trang = ({ posts: initialPosts, posters, allPosts: initialNumPosts }) => {
  const baseUrl = BACKEND();
  const classes = useStyles()
  const router = useRouter();
  const title = "Giảm giá"
  const [posts, setPosts] = useState(initialPosts)
  const [numPosts, setNumPosts] = useState(initialNumPosts);
  const [num, setNum] = useState(2);
  const [is_floating, setIs_floating] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const ads1 = posters?.ads1?.url ?? "";
  const ads2 = posters?.ads2?.url ?? "";
  const groupBanner = posters?.groupbanner?.url ?? "";

  const handleTag = (mien) => {
    const { pathname } = router;
    router.push(`${pathname}?where=${mien}`)
  };
  
  const top2lastest = posts ? posts.slice(0, 2) : null;
  const top4lastest = posts ? posts.slice(2, 6) : null;

  const handleLoadMore = async () => {
    setWaiting(true)
    const newPosts = await getPostByType("giam-gia", num, where);
    setPosts((prev) => ([...prev, ...newPosts ]));
    setWaiting(false)
    setNum((prev) => prev +=1 );
  };
  const toggleVisibility = () => {
    if (window.pageYOffset > 1500) {
      setIs_floating(true);
    } else {
      setIs_floating(false);
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", function (e) {
      toggleVisibility();
    });
  }, []);

  const where = router.query.where

  useEffect(async () => {
    if (where) {
      const newPosts = await getPostByType("giam-gia", 1, where);
      setPosts(newPosts);
      const newNumPosts = await countPostsByType("lich-trinh", where);
      setNumPosts(newNumPosts);
    } else {
      setPosts(initialPosts);
      setNumPosts(initialNumPosts);

    };
  }, [where]);
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
      <NextSeo {...SEO}/>
      <Hidden smDown>
          <div  className="groupBanner">
              <img src={`${baseUrl}${groupBanner}`} alt="group-banner" width="100%"/>
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
      <div className="where">
          <Button variant="contained" className={classes.margin} onClick={() => handleTag('bac')}>
            Bắc
            </Button>
          <Button variant="contained" className={classes.margin} onClick={() => handleTag('trung')} >
            Trung
            </Button>
          <Button variant="contained" className={classes.margin} onClick={() => handleTag('nam')} >
            Nam
            </Button>
        </div>
      <Homenews>
      <Grid container spacing={2}>
          <Grid container item md={12} spacing={1}>
            {top2lastest ? top2lastest.map(({
              tieuDe,
              anhGioiThieu,
              slug,
              the_loai
            }) => {
              const url = anhGioiThieu?.url ?? ''
              const name = the_loai?.name ?? '';
              return (
                <Grid item md={6} sm={6} xs={6} key={slug}>
                    <Link href={`/${name}/${slug}`}>
                      <a>
                      <img className="top2_image"  src={`${baseUrl}${url}`} alt="mota"/>
                      <h4>{tieuDe}</h4>
                      </a>
                    </Link>
                </Grid>
              )
            }) : null}
          </Grid>
          <Grid container item md={12} spacing={1}>
          {top4lastest ? top4lastest.map(({
              tieuDe,
              anhGioiThieu,
              slug,
              the_loai
            }) => {
              const url = anhGioiThieu?.url ?? '';
              const name = the_loai?.name ?? '';
              return (
                <Grid item md={3} sm={6} xs={6} key={slug}>
                    <Link href={`/${name}/${slug}`}>
                      <a>
                       <img className="top4_image" width="100%" src={`${baseUrl}${url}`} alt="mota"/>
                       <h4>{tieuDe}</h4>
                      </a>
                    </Link>
                </Grid>
              )
            }) : null}
          </Grid>
        </Grid>
      <Grid container spacing={2}>
        <Grid item sm={9} xs={12}>
          <div className="homenews_title">
            <h3>Tin dành cho bạn</h3>
          </div>
          <div className="news_list">
            {posts && posts.length ? _.map(posts, ({ 
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
          <div className="loadmore">
            {
              numPosts === posts.length ? null :  <Button disabled={waiting} onClick={handleLoadMore}>{waiting ? 'Đang tải': 'Xem thêm'}</Button>
            }
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
              <img src={`${baseUrl}${ads1}`} alt="lien-he-quang-cao-yeu-vivu" width="100%"/>
            </div>
            <div
              // className={`right_topBanner ${is_floating ? 'isfloating' : ''}`}
            >
              <img src={`${baseUrl}${ads2}`} alt="lien-he-quang-cao-yeu-vivu" width="100%"/>
            </div>
          </div>
        </Grid>
        </Hidden>
      </Grid>
    </Homenews>
    </Wrapper>
  );
};

Trang.propTypes = {};

Trang.getInitialProps = async (ctx) => {
  const posts = (await getPostByType("giam-gia", 1)) || [];
  const posters = await getPosters();
  const allPosts = await countPostsByType("giam-gia");
  return {
    posts: _.reverse(_.orderBy(posts, ['published_at'])),
    posters,
    allPosts
  }
}

export default Trang;

