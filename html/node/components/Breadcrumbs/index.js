import React from "react";
import { Breadcrumbs, Typography } from "@material-ui/core";
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
             slug ?  <Link href={slug} key={slug}>
             <a>{title}</a>
           </Link> : <Typography key={slug}>{title}</Typography>
            ))
          : null}
      </Breadcrumbs>
    </div>
  );
};
export default CustomizedBreadCrumns;
