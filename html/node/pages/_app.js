import { DefaultSeo } from "next-seo";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StylesProvider, makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Router from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import Waiting from "../components/Waiting";

import SEO from "../next-seo.config";
import { wrapper } from "../store";
import { signInHandler } from "../redux/actions/user";

const useStyles = makeStyles({
  button: {
    position: "fixed",
    bottom: "10%",
    right: "1rem",
    boxShadow: "none",
    outline: "none",
    borderRadius: "50% 50%",
    height: "3rem",
    width: "3rem",
    minWidth: "unset",
  },
});
function App({ Component, pageProps }) {
  const [is_visible, setIs_visible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(({ user }) => user.user);
  const dispatch = useDispatch();
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
    if (!user) {
      const localUser = JSON.parse(window.localStorage.getItem("user"));
      if (localUser) dispatch(signInHandler(localUser));
    }
    
  }, []);
  const classes = useStyles();
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link rel="icon" href="/yeuvivulogo.svg" />
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>  */}
      </Head>
      <StylesProvider injectFirst>
        <DefaultSeo {...SEO} />
        {isLoading ? <Waiting fullscreen type="WindMillLoading" /> : null}
        {/* { isLoading ? <Loader color="#fff" type="cylon" /> : null } */}
        <Header user={user} />

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
        <Footer />
      </StylesProvider>
    </>
  );
}

export default wrapper.withRedux(App);
