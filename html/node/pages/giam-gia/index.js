import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import _ from 'lodash';
import { BACKEND } from '../../libs/config';

import {
  Breadcrumbs,
  Typography,
  Button,
  Grid,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { getPostByType } from '../api';


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
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const pageTitleMapping = {
  ["diem-den"]: "Điểm đến",
  ["giam-gia"]: "Giảm giá",
  ["lich-trinh"]: "Lịch trình",
  ["am-thuc"]: "Ẩm thực",
  ["review"]: "Review",
};

const Trang = ({posts: initialPosts}) => {
  const baseUrl = BACKEND();
  const classes = useStyles()
  const router = useRouter();
  const title = "Giảm giá";
  const [posts, setPosts] = useState(initialPosts)
  const handleTag = (mien) => {
    const { pathname } = router;
    router.push(`${pathname}?where=${mien}`)
  }
  const [is_floating, setIs_floating] = useState(false);
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
  useEffect( async () => {
    if(where) {
      const newPosts = await getPostByType("giam-gia", 1, where);
      setPosts(newPosts);
    } else setPosts(initialPosts);
  }, [where]);

  return (
    <Wrapper className="container">
      <div className="titleNBreadCrumbs">                     
        <h2>{title}</h2>
        <div>
          <Breadcrumbs  aria-label="breadcrumb">
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
          <Grid  container item md={12} spacing={2}>
              <Grid item md={12} sm={12} xs={12}>

              </Grid>
          </Grid>
          <Grid container item md={12}>

          </Grid>
        </Grid>
        <div>
        <Grid container spacing={2}>
        <Grid item sm={9} xs={12}>
          <div className="homenews_title">
            <h3>Tin dành cho bạn</h3>
          </div>
          <div className="news_list">
            {posts && posts.length ? posts.map(({
          tieuDe,
          anhGioiThieu,
          slug,
          tags,
          published_at,
          mota
        }) => {
            const url = anhGioiThieu ? anhGioiThieu.url : "";
          return (
            <Link href={`giam-gia/${slug}`} key={slug}>
                <a>
                <div className="news_item " >
                <Hidden smUp><h3>{tieuDe}</h3></Hidden>
                <Grid container spacing={2}>
                  <Grid  item xs={4} sm={3}>
                    <img width="100%" src={`${baseUrl}${url}`} alt=""  height="auto" />
                  </Grid>
                  <Grid item xs={8} sm={9}>
                  <Hidden smDown><h3>{tieuDe}</h3></Hidden>
                    <span>{published_at} | {
                        tags ? tags.map(({ tagName }, id) => <Link key={id} href="/"><a style={{
                          fontWeight: '500',
                          marginRight: '4px',
                          color: 'grey',
                          fontSize: '12px'
                        }}>#{tagName}</a></Link>)
                       : null
                      }</span>
                    <p className="item_desc">{mota}</p>
                  </Grid>
                </Grid>
              </div>
                </a>
              </Link>
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
                backgroundColor: "#FBE0B3",
                width: 300,
                height: 600,
                marginBottom: '3rem'
              }}
            >
              <h3>banner for ads</h3>
            </div>
            <div
              className={`right_topBanner ${is_floating ? 'isfloating' : ''}`}
              style={{
                backgroundColor: "#DEFBFF",
                width: 300,
                height: 600,
              }}
            >
              <h3>banner for ads</h3>
            </div>
          </div>
        </Grid>
        </Hidden>
      </Grid>
        </div>
      </div>
    </Wrapper>
  );
};

Trang.propTypes = {};
Trang.getInitialProps = async (ctx) => {
  const posts = (await getPostByType("giam-gia", 1)) || []
    return {
      posts
    }
}

export default Trang;
