import React from "react";
import Sidebar from "../components/Sidebar";
import Categorysheader from "../components/Categorysheader";
import PosterSlider from "../components/PosterSlider";
import CardSlider from "../components/CardSlider";

const Home = () => {
    
  return (
    <div className=" w-full h-[calc(100vh-80px)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className=" lg:relative w-full h-full overflow-scroll show-scroll">
        {/* poster */}
        <main className="w-full h-auto lg:h-[90%]">
          <PosterSlider/>
        </main>
        {/* categorys */}
        <div className="slider-container w-full mx-auto h-auto flex flex-col gap-10 bg-[#070140] py-5 lg:py-10 lg:px-10">
          <div className="flex flex-col gap-4  lg:gap-5 px-2 md:px-6 lg:px-2">
            <Categorysheader title={"New Releases"} link={"red"} />
            <CardSlider/>
          </div>

          {/* <div className="flex flex-col gap-5 px-2 md:px-6 lg:px-2">
            <Categorysheader title={"New Releases"} link={"red"} />
            <CardSlider/>
          </div>

          <div className="flex flex-col gap-5 px-2 md:px-6 lg:px-2">
            <Categorysheader title={"New Releases"} link={"red"} />
            <CardSlider/>
          </div>

          <div className="flex flex-col gap-5 px-2 md:px-6 lg:px-2">
            <Categorysheader title={"New Releases"} link={"red"} />
            <CardSlider/>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
