import React, { useState } from "react";
import { FaRegEye, FaStarHalfAlt } from "react-icons/fa";
import { RiMovieLine } from "react-icons/ri";
import { TbMovie } from "react-icons/tb";
import Countbox from "./Countbox";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import Listbox from "./Listbox";
import { useContext } from "react";
import { AdminContext } from "../context/adminContext";
import { TbRefresh } from "react-icons/tb";
import { TfiCup } from "react-icons/tfi";

const Dashborad = () => {
  const { movieTotal, seriesTotal, userTotal, reportTotal, movies, series } =
    useContext(AdminContext);

  console.log("movie", movies);
  console.log("series", series);

  const [refresh, setRefresh] = useState(false); // Initial key state

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className=" w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg border-[1px] border-solid border-white border-opacity-20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll scroll-smooth show-scroll">
      <div className="flex flex-col md:flex md:flex-row items-center justify-around gap-5">
        {/* type one */}
        <Countbox
          title={"Total Shows"}
          icon={<RiMovieLine />}
          count={seriesTotal}
        />
        {/* type two */}
        <Countbox
          title={"Total Movies"}
          icon={<TbMovie />}
          count={movieTotal}
        />
        {/* type three */}
        <Countbox title={"Total Users"} icon={<FaRegEye />} count={userTotal} />
        {/* type four */}
        <Countbox
          title={"Total Reports"}
          icon={<MdOutlineReportGmailerrorred />}
          count={reportTotal}
        />
      </div>
      <div className="w-full flex flex-col gap-7 md:flex md:flex-row md:gap-5 mt-5">
        <div className="w-full flex flex-col gap-5">
        <Listbox data={movies} tabelName={'TOP MOVIES'}/>
          <Listbox data={series} tabelName={'TOP SHOWS'}/>
        </div>
        {/* <div className="w-full flex flex-col gap-5">
          <Listbox />
          <Listbox />
        </div> */}
      </div>
    </div>
  );
};

export default Dashborad;
