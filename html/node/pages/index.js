import Head from "next/head";
import { NextSeo } from 'next-seo';
import TopNews from '../components/TopNews';
import HomeNews from '../components/HomeNews';
import {
  getAllPostsForHome,
  getAdsPoster1,
  getAdsPoster2,
  getGroupBanner,
  getProfileImage,
  getHomepageSeo,
  getPosters
} from './api';


function Home({
  posts,
  seoContent,
  posters
 }) {
   const {
     ads1: adsPoster1,
     ads2: adsPoster2,
     groupBanner,
     instagram: profileImage
   } = posters
  const { 
    title,
    keywords,
    image,
    description,
  } = seoContent;
  const   {
    url,
    alternativeText
  } = image || '';
  const SEO = {
    title,
    description,
    keywords,
    openGraph: {
      images : [
          {
              url: `https://yeuvivu.vn:1337${url}`,
              width: 800,
              height: 600,
              alt: alternativeText,
          }
      ]
      
  }
}
  return (
    <div>
      <NextSeo {...SEO}/>
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
export default Home;
