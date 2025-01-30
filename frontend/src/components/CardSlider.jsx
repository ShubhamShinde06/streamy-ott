import React from "react";
import Cardsitem from "../components/Cardsitem";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CardSlider = () => {
  const responsive = {
    superLargeDesktop:{
      breakpoint: {max: 4000, min: 1024},
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className=" scroll-hover">
      <Carousel responsive={responsive}>
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
        
      </Carousel>
    </div>
  );
};

export default CardSlider;
