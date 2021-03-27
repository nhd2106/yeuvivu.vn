import Link from "next/link";
import { Grid } from "@material-ui/core";

import styled from 'styled-components';

const FooterStyles = styled.div`
background: #F7F7F4;
  // height: 45vh;
  color: black;
  .footer {
    width: 80%;
    margin: auto;
    padding: 5rem 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // border-top: 1px solid #D8D8D8;
    border-bottom: 1px solid #D8D8D8;
    .helps {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      a {
        margin-top: 1rem;
      }
    }
    .left {
      flex: 1 1 20rem;
      span {
        margin-top: 1rem;
      }
      .social {
        width: 30%;
        display: flex;
        list-style: none;
        justify-content: space-between;
        align-items: center;
        margin: 2rem 0;
        li {
          margin-right: 1rem;
        }
      }
    }
  }
  .copyright {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 2rem;
  }
  .heading {
    font-size: 20px;
    font-weight: 600;
    margin: 1rem 0;
  }
`;

export default function Footer() {
  return (
    <>
      <FooterStyles>
        <div className="footer">
          <Grid container>
            <Grid item md={4}>
            <div className="left">
            <h1>Yêu Vivu</h1>
              <span>
                Đồng hành cùng kỳ nghỉ của bạn, <br></br> bọn mình luôn luôn có
                giá ưu đãi nhất.
              </span>
              <ul className="social">
                <li>
                  <a href="https://www.facebook.com/yeuvivuvietnam" title="facebook-social-media">
                    <img src="/facebook.svg" alt="facebook-social-media" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com" title="instagram-social-media">
                    <img src="/instagram.svg" alt="instagram-social-media" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com" title="youtube-social-media">
                    <img src="/youtube.svg" alt="youtube-social-media" />
                  </a>
                </li>
              </ul>
            </div>
            </Grid>
          <Grid item md={4}>
              <div className="heading">Cần trợ giúp?</div>
              <div className="helps">
                <Link href="/tro-giup">
                  <a>. Đặt chỗ thế nào</a>
                </Link>
                <Link href="/lien-he">
                  <a>. Liên hệ</a>
                </Link>
                <Link href="/tro-giup">
                  <a>. Hỏi đáp</a>
                </Link>
                <Link href="/tro-giup">
                  <a>. Tuyển dụng</a>
                </Link>
              </div>
            </Grid>
            <Grid item md={4} xs={12} className="ads">
              <div className="heading">Facebook fanpage</div>
              <div class="fb-page"
                data-href="https://www.facebook.com/yeuvivuvietnam"
                data-width="300"
                data-hide-cover="false"
                data-show-facepile="true"></div>
            </Grid>
          </Grid>
        </div>
        <div className="copyright">
          <h2>Yêu Vivu</h2>
          <span>Copyright © 2021 Yêu Vivu.</span>
        </div>
      </FooterStyles>
    </>
  );
}
