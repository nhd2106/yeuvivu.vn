import React, { useEffect, useCallback, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NextSeo } from "next-seo";
import ImageGallery from "react-image-gallery";

import { Breadcrumbs } from "../../components/";
import { Paper, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { HotelStyles, imageStyles } from "../../styles";

import { handlerGetProductDetails } from "../../redux/actions/products";
import { BACKEND } from "../../libs/config";


const Wrapper = styled.div`
        padding-top: "1rem"ơ
        padding-bottom: "5rem",

`

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const hotel = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = router.query;
  const [tabValue, setTabValue] = useState(0);
  const productDetails = useSelector(({ products }) => products.productDetails);
  useEffect(() => {
    dispatch(handlerGetProductDetails(slug));
  }, [slug]);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const title = productDetails ? productDetails.title : "";
  const renderDetail = useMemo(() => {
    if (productDetails) return { __html: productDetails.details };
  }, [productDetails]);
  const renderFeatures = useMemo(() => {
    if (productDetails) return { __html: productDetails.features };
  }, [productDetails]);
  const slugNTitle = [
    { slug: "/hotels", title: "khách sạn" },
    { slug: `/${slug}`, title },
  ];
  const SEO = {
    title,
  };
  const renderDetails = useCallback(() => {
    if (productDetails && Object.keys(productDetails).length) {
      const { title, details, og_image, detail_images, price } = productDetails;
      const baseUrl = BACKEND();
      const settings = {
        customPaging: function (i) {
          return (
            <a>
              <img src={`${baseUrl}${detail_images[i].url}`} width="100%" />
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      const imagesDetails = detail_images
        ? detail_images.map(({ url }) => {
            const imageTarget = url.split("/uploads/")[1];
            const thumbnail = `${baseUrl}/uploads/thumbnail_${imageTarget}`;
            return {
              original: `${baseUrl}${url}`,
              thumbnail,
            };
          })
        : null;
      return (
        <div>
          <h2>{title}</h2>
          <ImageGallery items={imagesDetails} />
          <Paper>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Mô tả" {...a11yProps(0)} />
              <Tab label="Tiện ích" {...a11yProps(1)} />
              <Tab label="Loại phòng " {...a11yProps(2)} />
            </Tabs>
          </Paper>
          <Paper style={{
            marginTop: '1rem'
          }}>
          <TabPanel value={tabValue} index={0}>
          <div
          dangerouslySetInnerHTML={renderDetail}
        />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
          <div
          dangerouslySetInnerHTML={renderFeatures}
        />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            Item Three
          </TabPanel>
          </Paper>
        </div>
      );
    }
    return null;
  }, [productDetails, tabValue]);
  return (
    <Wrapper>
      <HotelStyles>
        <NextSeo {...SEO} />
        <Breadcrumbs slugNTitle={slugNTitle} />
        {renderDetails()}
      </HotelStyles>
    </Wrapper>
  );
};

export default hotel;
