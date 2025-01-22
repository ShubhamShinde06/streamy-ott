import React from "react";
import Cardsitem from "../components/Cardsitem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlider = () => {
  var settings = {
    dots: false, // Hides dots navigation
    arrows: true, // Hides left and right navigation arrows
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Default for extra-large laptops
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440, // Extra-large laptops
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // Large laptops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Phones
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <Cardsitem />
        </div>
        <div>
          <Cardsitem />
        </div>
        <div>
          <Cardsitem />
        </div>
        <div>
          <Cardsitem />
        </div>
        <div>
          <Cardsitem />
        </div>
        <div>
          <Cardsitem />
        </div>
        <div>
          <Cardsitem />
        </div>
        <div>
          <Cardsitem />
        </div>
        <div>
          <Cardsitem />
        </div>
      </Slider>
    </div>
  );
};

export default CardSlider;
