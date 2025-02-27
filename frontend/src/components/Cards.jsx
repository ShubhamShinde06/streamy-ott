import React, { useContext } from "react";
import Cardsitem from "../components/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FrontendContext } from "../context/frontendContext";

const Cards = ({ Data }) => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1500 }, items: 3.4 },
    desktopOne: { breakpoint: { max: 1440, min: 1390 }, items: 3.2 },
    desktopTwo: { breakpoint: { max: 1400, min: 1024 }, items: 2.3 },
    desktopThree: { breakpoint: { max: 1280, min: 1280 }, items: 3.2 },
    tablet: { breakpoint: { max: 800, min: 464 }, items: 4 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 2.4 },
  };

  const { loading } = useContext(FrontendContext);

  // if(loading){
  //   return   <motion.div className="lg:w-[340px] bg-gray-800  shadow-lg animate-pulse lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative  mr-3">
  //   <div className="lg:w-[340px]  lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mr-3">
  //     <img
  //       src={""}
  //       alt="streamy"
  //       className="w-full h-full lg:hidden block"
  //     />
  //     <img
  //       src={""}
  //       alt="streamy"
  //       className="w-full h-full lg:block hidden"
  //     />
  //     <div className=" opacity-0 absolute top-0 w-[100%] h-full flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box"></div>
  //   </div>
  // </motion.div>
  // }

  return (
    <Carousel responsive={responsive} arrows={true}>
      {Data.map((item, index) =>
        loading ? (
          <>
            <motion.div className="lg:w-[340px] bg-gray-800  shadow-lg animate-pulse lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative  mr-3">
              <div className="lg:w-[340px]  lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mr-3">
                <img
                  src={""}
                  alt="streamy"
                  className="w-full h-full lg:hidden block"
                />
                <img
                  src={""}
                  alt="streamy"
                  className="w-full h-full lg:block hidden"
                />
                <div className=" opacity-0 absolute top-0 w-[100%] h-full flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box"></div>
              </div>
            </motion.div>
          </>
        ) : (
          <Cardsitem
            key={index}
            id={item._id}
            category={item.category}
            img1={item.image[0]}
            img2={item.image[1]}
          />
        ),
      )}
    </Carousel>
  );
};

export default Cards;
