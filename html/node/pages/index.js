import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  Typography,
  Button,
  Grid,
  Hidden,
} from "@material-ui/core";

import TopNews from '../components/TopNews';
import HomeNews from '../components/HomeNews';
import { handlerGetAllPosts } from "../redux/actions/blog";
import { getAllPostsForHome } from './api';


export default function Home({ posts }) {
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(handlerGetAllPosts());
  }, []);
  return (
    <div>
      <Head>
        <title>Yêu ViVu</title>
        <meta name="keywords" content="Yêu Vivu, đặt phòng khách sạn, chuyên voucher resort, voucher villa, voucer khách sạn" />
        <meta name="author" content="Yêu vivu || đặt phòng khách sạn, book phòng, săn voucher, voucher siêu giảm giá" />
      </Head>
      <section className="container">
        {/* <div className={styles.carousel}>
        </div> */}
        {/* <Carousel /> */}
        <TopNews posts={posts}/>
        <HomeNews posts={posts}/>

      </section>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        <div
          className="destinations"
          style={{
            width: "80%",
          }}
        >
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ preview = null }) {
  const posts = (await getAllPostsForHome(preview)) || []
  return {
    props: { posts, preview },
  }
}
