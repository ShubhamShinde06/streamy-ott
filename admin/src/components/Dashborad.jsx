import React, { useState } from "react";
import { FaRegEye, FaStarHalfAlt } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import { TbMovie } from "react-icons/tb";
import Countbox from "./Countbox";
import { TfiCup } from "react-icons/tfi";
import { TbRefresh } from "react-icons/tb";
import Listbox from "./Listbox";

const Dashborad = () => {
  return (
    <div className=" w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg border-[1px] border-solid border-white border-opacity-20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll scroll-smooth show-scroll">
      <div className="flex flex-col md:flex md:flex-row items-center justify-around gap-5">
        {/* type one */}
        <Countbox
          title={"Subscriptions this month"}
          icon={<IoDiamondOutline />}
          count={"1678"}
        />
        {/* type two */}
        <Countbox
          title={"Items added this month"}
          icon={<TbMovie />}
          count={"373"}
        />
        {/* type three */}
        <Countbox
          title={"Views this month"}
          icon={<FaRegEye />}
          count={"878"}
        />
        {/* type four */}
        <Countbox
          title={"Reviews this month"}
          icon={<FaStarHalfAlt />}
          count={"1678"}
        />
      </div>
      <div className="w-full flex flex-col gap-7 md:flex md:flex-row md:gap-5 mt-5">
        <div className="w-full flex flex-col gap-5">
          <Listbox />
          <Listbox />
        </div>
        <div className="w-full flex flex-col gap-5">
          <Listbox />
          <Listbox />
        </div>
      </div>
    </div>
  );
};

export default Dashborad;
