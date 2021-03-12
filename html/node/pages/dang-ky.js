import { NextSeo } from "next-seo";

import SignUp from "../components/Sign-up";

const DangKy = (props)  => {
  const SEO = {
    title: "Đăng ký",
  };
  return (
    <>
      <NextSeo {...SEO} />
      <SignUp />
    </>
  );
}

export default DangKy;
