import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const PosterSlider = () => {
  const settings = {
    dots: true, // Hides dots navigation
    arrows: false, // Hides left and right navigation arrows
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 10000,
  };

  return (
    <div className="slider-container w-full h-[100%] relative">
      {/* logo */}
      <header className=" hidden lg:block absolute top-8 left-10 z-10">
        <Link to={"/"}>
          <h1 className="text-4xl font-bold logo">
            STREAMY
          </h1>
        </Link>
      </header>

      <Slider {...settings} className="h-[95%]">
        <div className="-z-10 relative">
          <img
            className="w-full h-full"
            src="https://i.ebayimg.com/images/g/4NQAAOSwyTpjk7dC/s-l1200.jpg"
            alt=""
          />
          {/* content */}
          <div className=" absolute w-[100%] h-full in-site-color top-0 left-0">

          </div>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default PosterSlider;
