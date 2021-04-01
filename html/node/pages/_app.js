import { DefaultSeo } from "next-seo";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StylesProvider, makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import Head from "next/head";
import Router from "next/router";


import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import Waiting from "../components/Waiting";

import SEO from "../next-seo.config";
import { getLinksAndPhone } from './api';

const useStyles = makeStyles({
  button: {
    position: "fixed",
    bottom: "14%",
    right: "1rem",
    boxShadow: "none",
    outline: "none",
    borderRadius: "50% 50%",
    height: "2.5rem",
    width: "2.5rem",
    minWidth: "unset",
  },
});
function App({ Component, pageProps }) {
  const [is_visible, setIs_visible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [linksAndPhone, setLinksAndPhone] = useState();
  Router.events.on("routeChangeStart", () => {
    setIsLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setIsLoading(false);
  });
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIs_visible(true);
    } else {
      setIs_visible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    document.addEventListener("scroll", function (e) {
      toggleVisibility();
    });
  }, []);

  useEffect( async () => {
    const data = await getLinksAndPhone();
    setLinksAndPhone(data);
  }, []);
  const classes = useStyles();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="U6QjPgRssVG5Mi1WVYxYiPzerwEqPoW21hz3eOGsZyc" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="shortcut icon" href="/yevivu.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"></link>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0" nonce="ywbB34Xn"></script>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js"></script>

      </Head>
      <StylesProvider injectFirst>
        <DefaultSeo {...SEO} />
        {isLoading ? <Waiting fullscreen type="WindMillLoading" /> : null}
        <Header linksAndPhone={linksAndPhone}/>

        <Component {...pageProps} />

        {is_visible ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={scrollToTop}
            style={{ zIndex: 1000 }}
          >
            <ArrowUpwardIcon />
          </Button>
        ) : null}
        <Footer linksAndPhone={linksAndPhone}/>
      </StylesProvider>
    </>
  );
}


export default App;
