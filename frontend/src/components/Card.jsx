import React from "react";
import { Link } from "react-router-dom";
import { IoMdPlayCircle } from "react-icons/io";

const Card = ({ id, category, img1, img2 }) => {
  return (
    <Link
      to={category === "series" ? `/seriesplayer/${id}` : `/movieplayer/${id}`}
    >
      <div className="lg:w-[340px] hover-box lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative hover-card mr-3">
         <img
          src={img1}
          alt="streamy"
          className="w-full h-full lg:hidden block"
        />
        <img
          src={img2}
          alt="streamy"
          className="w-full h-full lg:block hidden"
        />
        <div className=" opacity-0 absolute top-0 w-[100%] h-full flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box">
          <IoMdPlayCircle className=" cursor-pointer" />
        </div>
      </div>
    </Link>
  );
};
export default Card;
