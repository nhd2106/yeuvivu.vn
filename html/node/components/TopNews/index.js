import Link from "next/link";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { Grid, Hidden } from "@material-ui/core";

import { BACKEND } from '../../libs/config';

const Wrapper = styled.div`
  padding: 1rem 0 3rem 0;
  .flex {
    display: flex;
    gap: 3px;
  }
  .rightNews {
    flex-direction: column;
    .rightNews__item {
      margin-bottom: 1rem;
    }
  }
  .groupBanner {
    margin: 2rem 0;
    padding: 5rem;
    background: #FFCC00;
    display: flex;
    justify-content: center;
  }
`;

const Topnews = (props) => {
  const baseurl = BACKEND();
  const posts = useSelector(({ blog }) => blog.posts);
  const top4lastest = posts ? posts.slice(0, 4) : null;
  const top3lastest = posts ? posts.slice(1, 4) : null;
  const top6lastest = posts ? posts.slice(0, 6) : null;
  const lastest = top4lastest ? top4lastest[1] : null;

  return (
    <>
      <Wrapper>
        <Grid container spacing={1}>
          <Hidden smDown>
          <Grid smDown className="groupBanner" md={12} lg={12}>
                Group banner
            </Grid>
          </Hidden>
          <Grid container item xs={12} sm={12} md={9} lg={9} spacing={1}>
          <Grid className="top-news" item xs={12} sm={6} md={8} lg={8}>
            <div style={{paddingBottom: '1rem'}}>
              {lastest ? (
                <Link href="[Trang]/[post]"
                as={`/${lastest.the_loai.name}/${lastest.slug}`}
                >
                    <a>
                        <img
                        width="100%"
                        src={`${baseurl}${lastest.anhGioiThieu.url}`}
                    />
                    <h1> {lastest.tieuDe ? lastest.tieuDe : ""}</h1>
                    <p>
                    {lastest.mota ? lastest.mota : ""}
                  </p>
                    </a>
                </Link>
              ) : null}
            </div>
            <div>
            {top3lastest
                ? top3lastest.map(
                    ({
                      tieuDe,
                      anhGioiThieu: { url },
                      slug,
                      the_loai: { name },
                    }) => (
                      <Link
                        href="[Trang]/[post]"
                        as={`/${name}/${slug}`}
                        key={slug}
                      >
                        <a>
                        <p style={{fontWeight: 500, fontSize: 15}}>{`- ${tieuDe}`}</p>
                        </a>
                      </Link>
                    )
                  )
                : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <div className="flex rightNews">
              {top6lastest
                ? top6lastest.map(
                    ({
                      tieuDe,
                      anhGioiThieu: { url },
                      slug,
                      the_loai: { name },
                    }) => (
                      <Link
                        href="[Trang]/[post]"
                        as={`/${name}/${slug}`}
                        key={slug}
                      >
                        <a>
                          <div className="flex rightNews__item">
                            <div>
                              <img
                                width="120"
                                height="100"
                                src={`${baseurl}${url}`}
                              />
                            </div>
                            <p style={{fontWeight: 500, fontSize: 15}}>{tieuDe}</p>
                          </div>
                        </a>
                      </Link>
                    )
                  )
                : null}
            </div>
          </Grid>
          </Grid>
          <Hidden only={["sm", "xs"]}>
            <Grid item xs={12} sm={3} md={3} lg={3}>
              <div
                className="right_topBanner"
                style={{
                  backgroundColor: "#FFCC00",
                  width: 300,
                  height: 600,
                }}
              >
                <h3>top banner for instagram</h3>
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Topnews;
