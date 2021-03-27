import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { NextSeo } from 'next-seo';


import {
  Breadcrumbs,
  Typography,
  Button,
  Grid,
  Hidden,
} from "@material-ui/core";


import { getPostByType, countPostsByType } from '../api';
import { BACKEND } from '../../libs/config';


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


const Trang = ({posts: initialPosts, allPosts: initialNumPosts}) => {
  const baseUrl = BACKEND();
  const classes = useStyles()
  const router = useRouter();
  const title = "Lịch trình";

  const [is_floating, setIs_floating] = useState(false);
  const [posts, setPosts] = useState(initialPosts)
  const [numPosts, setNumPosts] = useState(initialNumPosts);
  console.log(numPosts)
  const { where } = router.query;
  const handleTag = (mien) => {
    const { pathname } = router;
    router.push(`${pathname}?where=${mien}`)
  }
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
  useEffect( async () => {
    if(where) {
      const newPosts = await getPostByType("lich-trinh", 1, where);
      const newNumPosts = await countPostsByType("lich-trinh", where);
      setPosts(newPosts);
      setNumPosts(newNumPosts);
    } else {
      setPosts(initialPosts);
      setNumPosts(initialNumPosts);

    };
  }, [where]);
  const SEO = {
    title,
    keywords: 'keywords',
    description: ''
  }

  return (
    <Wrapper className="container">
      <NextSeo {...SEO}/>
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
            <Link href={`lich-trinh/${slug}`} key={slug}>
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
  const posts = (await getPostByType("lich-trinh", 1)) || [];
  const allPosts = await countPostsByType("lich-trinh");
    return {
      posts,
      allPosts
    }
}

export default Trang;
