import React from "react";
import Cardsitem from "../components/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Cards = ({ Data }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 800 }, items: 3 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2.4 },
  };

  return (
    <Carousel responsive={responsive} arrows={true}>
      {Data.map((item, index) => (
        <Cardsitem 
          key={index} 
          id={item._id} 
          category={item.category} 
          img1={item.image[0]}
          img2={item.image[1]}
        />
      ))}
    </Carousel>
  );
};

export default Cards;
