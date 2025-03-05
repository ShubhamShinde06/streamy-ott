import React from "react";
import { Link } from "react-router-dom";

const Categorysheader = ({ title, link }) => {
  return (
    <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
      <h1 className="lg:text-3xl text-1xl">{title}</h1>
      {/* <Link
        to={`/${link}`}
        className="lg:text-[18px] text-[15px] text-[#4a5370] font-bold tracking-wider"
      >
        See all
      </Link> */}
    </div>
  );
};

export default Categorysheader;
