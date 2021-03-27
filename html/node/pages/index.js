import { NextSeo } from 'next-seo';
import Head from 'next/head';
import _ from 'lodash';

import TopNews from '../components/TopNews';
import HomeNews from '../components/HomeNews';

import {
  getAllPostsForHome,
  getHomepageSeo,
  getPosters,
  countAllPosts
} from './api';


function Home({
  posts,
  seoContent,
  posters,
  allPosts
 }) {
   const {
     ads1: adsPoster1,
     ads2: adsPoster2,
     groupbanner,
     instagram: profileImage
   } = posters;

  const { 
    title,
    keywords,
    image,
    desccription,
  } = seoContent;
  const   {
    url,
    alternativeText
  } = image || '';
  const SEO = {
    title,
    description: desccription,
    keywords,
    openGraph: {
      title,
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
      <Head>
        <meta name="keywords" content={`${keywords}`} />
      </Head>
      <section className="container">
        <TopNews
        posts={posts}
        adsPoster1={adsPoster1}
        adsPoster2={adsPoster2}
        groupBanner={groupbanner}
        profileImage={profileImage}
        
        />
        <HomeNews
        posts={posts}
        adsPoster1={adsPoster1}
        adsPoster2={adsPoster2}
        allPosts={allPosts}
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
  const seoContent = await getHomepageSeo();
  const posters = await getPosters();
  const allPosts = await countAllPosts();
  return {
    posts: _.reverse(_.orderBy(posts, ['published_at'])),
    seoContent,
    posters,
    allPosts
  }
}
export default Home;
