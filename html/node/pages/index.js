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
import {
  getAllPostsForHome,
  getAdsPoster1,
  getAdsPoster2,
  getGroupBanner,
  getProfileImage
} from './api';


function Home({
  posts,
  adsPoster1,
  adsPoster2,
  groupBanner,
  profileImage
 }) {
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
        <TopNews
        posts={posts}
        adsPoster1={adsPoster1}
        adsPoster2={adsPoster2}
        groupBanner={groupBanner}
        profileImage={profileImage}
        
        />
        <HomeNews
        posts={posts}
        adsPoster1={adsPoster1}
        adsPoster2={adsPoster2}
        profileImage={profileImage}
        groupBanner={groupBanner}
        
        />

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

Home.getInitialProps = async (ctx) => {
  const posts = (await getAllPostsForHome(1)) || [];
  const adsPoster1 = await getAdsPoster1();
  const adsPoster2 = await getAdsPoster2();
  const profileImage = await getProfileImage();
  const groupBanner = await getGroupBanner();
  return {
    posts, adsPoster1, adsPoster2,  profileImage, groupBanner ,
  }
}
export default Home;

// export async function getStaticProps({ preview = null }) {
//   const posts = (await getAllPostsForHome(preview)) || [];
//   const adsPoster1 = await getAdsPoster1();
//   const adsPoster2 = await getAdsPoster2();
//   const profileImage = await getProfileImage();
//   const groupBanner = await getGroupBanner();
  
//   return {
//     props: { posts, preview, adsPoster1, adsPoster2,  profileImage, groupBanner },
//   }
// }
