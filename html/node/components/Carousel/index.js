import _ from "lodash";
import { useRouter } from "next/router";
import Slider from "react-slick";

export default function AppCarousel() {
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: true,
  };
  return (
    <>
      <div>
        <Slider  {...settings}>
          <div>
            <img
              style={{ minHeight: "20vh", width: "100%", display: "block" }}
              src="/phuquoc.jpg"
              alt="First slide"
            />
          </div>
          <div>
            <img
              style={{ minHeight: "20vh", width: "100%", display: "block" }}
              src="/phuquoc.jpg"
              alt="Third slide"
            />
          </div>
          <div>
            <img
              style={{ minHeight: "20vh", width: "100%", display: "block" }}
              src="/phuquoc.jpg"
              alt="Third slide"
            />
          </div>
        </Slider>
      </div>
    </>
  );
}
