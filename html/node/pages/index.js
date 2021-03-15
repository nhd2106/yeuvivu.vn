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
  return (
    <div>
      <Head>
        <title>Yêu Vivu | Blog review, trải nghiệm, resort, villa, khách sạn, trip.</title>
        <meta name="keywords" content="Yêu vivu, yeuvivu, yeu-vivu, Review, trải nghiệm, resort, villa, khách sạn, trips" />
        <meta name="description" content="Yêu vivu, yeuvivu.vn Chuyên trang Review, trải nghiệm, resort, villa, khách sạn, trips
            Cung cấp vouchers resort, villa, khách sạn có giá cả và trải nghệm tốt nhất." />
        <meta name="author" content="Yêu vivu | đặt phòng khách sạn, book phòng, săn voucher, voucher siêu giảm giá" />
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
