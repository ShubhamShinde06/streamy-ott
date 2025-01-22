import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

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
    <div className="slider-container w-full h-full relative lg:block flex flex-col items-center justify-center">
      {/* logo */}
      <header className="w-[95%] h-[80px] flex items-center justify-between px-1 lg:px-0 lg:absolute top-4 left-10 z-10">
        <Link to={"/"}>
          <h1 className="lg:text-4xl text-3xl font-bold logo">STREAMY</h1>
        </Link>
        {/* phone icons */}
        <div className=" lg:hidden flex items-center gap-4">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold logo">
              <IoSearch />
            </h1>
          </Link>
          <Link to={"/"}>
            <h1 className="text-2xl font-bold logo">
              <FaRegUserCircle />
            </h1>
          </Link>
        </div>
      </header>

      <Slider
        {...settings}
        className="h-auto w-[95%]   rounded-md overflow-hidden lg:overflow-visible lg:w-full lg:h-[95%] lg:rounded-none"
      >
        <div className="lg:-z-10 lg:relative h-[70vh] lg:h-full">
          <img
            className="w-full h-full"
            src="https://i.ebayimg.com/images/g/4NQAAOSwyTpjk7dC/s-l1200.jpg"
            alt=""
          />
          {/* content */}
          <div className=" absolute w-[16.5%] h-[70vh]  in-site-color top-0 left-0 lg:w-full lg:h-full flex flex-col justify-end items-center lg:items-start gap-6 lg:px-[50px] lg:py-[100px] tracking-widest">
            <p className="w-[70%] text-2xl lg:block hidden">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
              quia consequatur laboriosam? Fuga unde voluptates placeat? Ipsa
              error saepe illum minus non laborum commodi repellendus officia ab
              numquam sint magni nihil, pariatur labore perspiciatis
              exercitationem voluptas nesciunt sed obcaecati repudiandae.
            </p>
            <div className="flex flex-col gap-6 w-full py-4 lg:py-0 lg:w-auto">
              <p className=" lg:text-2xl text-xl text-center lg:text-start">
                <span>Comdey</span>&#x2022;<span> Action </span>&#x2022;
                <span> Horror</span>
              </p>
              <div className=" flex items-center justify-evenly w-full lg:gap-4 ">
                <button className="backdrop-blur-sm bg-white text-black px-10 py-2 lg:py-3 lg:px-16 text-xl rounded-md flex items-center gap-3">
                  <FaPlay /> Play
                </button>
                <button className="backdrop-blur-sm bg-white/40 px-8 py-2 lg:py-3 lg:px-16  text-xl rounded-md flex items-center gap-1">
                  <MdAdd className=" text-2xl" />
                  My List
                </button>
              </div>
            </div>
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
