import _ from "lodash";
import { useRouter } from "next/router";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

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
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
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
