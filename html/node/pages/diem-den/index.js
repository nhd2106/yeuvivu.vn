import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import _ from 'lodash';
import { BACKEND } from '../../libs/config';
import { getDate } from '../../libs/utils';

import {
  Breadcrumbs,
  Typography,
  Button,
  Grid,
  Hidden,
  Box
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  getPostByType,
  getAdsPoster1,
  getAdsPoster2,
  getGroupBanner,
  getProfileImage,
  getHomepageSeo,
  getPosters

} from '../api';


const Wrapper = styled.div`
    .titleNBreadCrumbs {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 3rem;
        h3 {
            margin-bottom: 1rem;
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
    bottom: 10%
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

const Trang = ({ posts: initialPosts, adsPoster1 }) => {
  const baseUrl = BACKEND();
  const classes = useStyles()
  const router = useRouter();
  const title = "Điểm đến"
  const [posts, setPosts] = useState(initialPosts)
  const [num, setNum] = useState(2);
  const urlImage = adsPoster1 ? adsPoster1.url : '';
  const handleTag = (mien) => {
    const { pathname } = router;
    router.push(`${pathname}?where=${mien}`)
  }
  const [is_floating, setIs_floating] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const handleLoadMore = async () => {
    setWaiting(true)
    const newPosts = await getPostByType("diem-den", num, where);
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
      const newPosts = await getPostByType("diem-den", 1, where);
      setPosts(newPosts);
    } else setPosts(initialPosts);
  }, [where]);

  return (
    <Wrapper className="container">
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
        <div className="tags">
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
        <Grid container spacing={2}>
          <Grid container item md={12} spacing={2}>
            <Grid item md={12} sm={12} xs={12}>

            </Grid>
          </Grid>
          <Grid container item md={12}>

          </Grid>
        </Grid>
        
      </div>
      <Homenews>
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
                <Link href={`/${name}/${slug}`} key={slug}>
                  <a>
                    <span>
                    <Box className="news_item " >
                  <Hidden smUp><h3>{tieuDe}</h3></Hidden>
                  <Grid container spacing={2}>
                    <Grid  item xs={7} sm={4}>
                      <div> <img className="item_image" src={anhGioiThieu ?`${baseUrl}${anhGioiThieu.url}` : ''} alt="sdsdsd"  /></div>
                    </Grid>
                    <Grid item xs={5} sm={8}>
                    <Hidden only={['xs']}><h3>{tieuDe}</h3></Hidden>
                      <div>Ngày đăng: {getDate(published_at)}</div>
                      <div className="item_desc">{mota}</div>
                    </Grid>
                  </Grid>
                </Box>
                    </span>
                  </a>
                </Link>
              )
            }) : null}
          </div>
          <div className="loadmore">
            <Button disabled={waiting} onClick={handleLoadMore}>{waiting ? 'Đang tải': 'Xem thêm'}</Button>
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
              <img src={`${baseUrl}${urlImage}`} alt="lien-he-quang-cao-yeu-vivu" width="100%"/>
            </div>
            <div
              className={`right_topBanner ${is_floating ? 'isfloating' : ''}`}
            >
              <img src={`${baseUrl}${urlImage}`} alt="lien-he-quang-cao-yeu-vivu" width="100%"/>
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
  const posts = (await getPostByType("diem-den", 1)) || []
  const adsPoster1 = await getAdsPoster1();
  const adsPoster2 = await getAdsPoster2();
  const profileImage = await getProfileImage();
  const groupBanner = await getGroupBanner();
  const seoContent = await getHomepageSeo();
  const posters = await getPosters();
  return {
    posts,
    adsPoster1,
    adsPoster2, 
    profileImage,
    groupBanner,
    seoContent,
    posters
  }
}

export default Trang;

