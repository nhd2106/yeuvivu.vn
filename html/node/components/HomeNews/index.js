import { useEffect, useState } from "react";
import Link from 'next/link';
import styled from "styled-components";
import _ from "lodash";
import {
  Typography,
  Button,
  Grid,
  Hidden,
  Box
} from "@material-ui/core";
import { BACKEND } from '../../libs/config';
import { getAllPostsForHome } from '../../pages/api';

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

const HomeNews = ({ posts: initialPosts, adsPoster1 }) => {
  const baseUrl = BACKEND();
  const [is_floating, setIs_floating] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const urlImage = adsPoster1 ? adsPoster1.url : '';
  const [posts, setPosts] = useState(initialPosts);
  const [num, setNum] = useState(2);
  const toggleVisibility = () => {
    if (window.pageYOffset > 1500 && window.pageYOffset < -10) {
      setIs_floating(true);
    } else {
      setIs_floating(false);
    }
  };
  useEffect(() => {
    setNum(2);
    document.addEventListener("scroll", function (e) {
      toggleVisibility();
    });
  }, []);
  const handleLoadMore = async () => {
      setWaiting(true)
      const newPosts = await getAllPostsForHome(num);
      setPosts((prev) => ([...prev, ...newPosts ]));
      setWaiting(false)
      setNum((prev) => prev +=1 );
  };
  return (
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
                      {/* <span>{published_at}| {
                        tags ? tags.map(({ tagName }, id) => <Link key={id} href="/"><a style={{
                          fontWeight: '500',
                          marginRight: '4px',
                          color: 'grey',
                          fontSize: '12px'
                        }}>#{tagName}</a></Link>)
                       : null
                      }</span> */}
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
  );
};

export default HomeNews;
