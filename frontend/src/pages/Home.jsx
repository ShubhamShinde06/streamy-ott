import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import PosterSlider from "../components/PosterSlider";
import { FrontendContext } from "../context/frontendContext";
import Cards from "../components/Cards";
import Categorysheader from "../components/Categorysheader";

const Home = () => {
  const { new_release, posterdata, moviedata, seriesData } = useContext(FrontendContext);

  return (
    <div className=" w-full h-[calc(100vh-80px)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className=" lg:relative w-full h-full overflow-scroll show-scroll">
        {/* poster */}
        <main className="w-full h-auto lg:h-[90%]">
          <PosterSlider Data={posterdata} />
        </main>
        {/* categorys */}
        <div className="slider-container w-full mx-auto h-auto flex flex-col gap-10 bg-[#070140] py-5 lg:py-10 lg:px-10">
          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"New Release"} />
            <Cards Data={new_release} />
          </div>
          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"Movies"} />
            <Cards Data={moviedata} />
          </div>
          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"Web Series"} />
            <Cards Data={seriesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
