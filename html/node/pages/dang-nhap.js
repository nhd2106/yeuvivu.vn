import { NextSeo } from "next-seo";

import SignIn from "../components/Sign-in";

const DangNhap = (props) => {
  const SEO = {
    title: "Đăng nhập",
  };

  return (
    <>
      <NextSeo {...SEO} />
      <SignIn />
    </>
  );
};

export default DangNhap;
