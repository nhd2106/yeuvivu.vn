import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "next/link";

const CustomizedBreadCrumns = ({ slugNTitle }) => {
  return (
    <div
      style={{
        padding: "1rem 0",
        marginBottom: "1rem",
        borderTop: "1px solid #F3F4F9",
        borderBottom: "1px solid #F3F4F9",
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">
          <a>Trang chủ</a>
        </Link>
        {slugNTitle
          ? slugNTitle.map(({ slug, title }) => (
              <Link href={slug} key={slug}>
                <a>{title}</a>
              </Link>
            ))
          : null}
      </Breadcrumbs>
    </div>
  );
};
export default CustomizedBreadCrumns;
