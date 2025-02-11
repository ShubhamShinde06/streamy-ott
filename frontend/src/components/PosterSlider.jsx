import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

const PosterSlider = ({ Data }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true, // Enables infinite loop
    speed: 500,
    autoplay: true, // Enables autoplay
    autoplaySpeed: 5000, // Autoplay every 2 seconds
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full h-[70vh] md:h-[75vh] lg:h-screen xl:h-[90vh] relative flex flex-col items-center justify-center bg-black">
      {/* Header */}
      <header className="w-full h-8 lg:h-auto lg:bg-none flex items-center justify-between px-4 py-8 lg:py-0 lg:px-10 absolute top-0 lg:top-8 z-10 backdrop-blur-sm bg-white/15 lg:bg-transparent">
        <Link to={"/"}>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">STREAMY</h1>
        </Link>
        {/* Mobile Icons */}
        <div className="lg:hidden flex items-center gap-4 text-white">
          <Link to={"/search"}>
            <IoSearch className="text-2xl" />
          </Link>
          <Link to={"/"}>
            <FaRegUserCircle className="text-2xl" />
          </Link>
        </div>
      </header>

      {/* Slider Container */}
      <div className="w-full overflow-hidden">
        <Slider {...settings}>
          {Data.map((item, index) => (
            <div
              key={index}
              className="relative h-[70vh] md:h-[75vh] lg:h-screen xl:h-[90vh]"
            >
              <div className=" hidden lg:block w-full h-full">
                <img
                  className="w-full h-full object-cover "
                  src={item.image[1]}
                  alt={`Poster ${index}`}
                />
              </div>
              <div className=" block lg:hidden w-full h-full">
                <img
                  className="w-full h-full  "
                  src={item.image[0]}
                  alt={`Poster ${index}`}
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 in-site-color flex flex-col justify-end items-center gap-3 lg:gap-6 lg:items-start p-6 lg:p-14 xl:p-20">
                <p className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl w-4/5 hidden lg:block truncate-multiline">
                  {item.plot}
                </p>

                <p className="text-white text-xl md:text-lg lg:text-xl xl:text-2xl line-clamp-1">
                  {item.genre.flat().join(" • ")}
                </p>
                <div className="flex gap-4 mt-4">
                  <Link
                    to={
                      item.category === "series"
                        ? `/seriesplayer/${item._id}`
                        : `/movieplayer/${item._id}`
                    }
                    className="bg-white text-black px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2"
                  >
                    <FaPlay /> Play
                  </Link>
                  <button className="bg-white/40 text-white px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2">
                    <MdAdd className="text-2xl" />
                    My List
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PosterSlider;
