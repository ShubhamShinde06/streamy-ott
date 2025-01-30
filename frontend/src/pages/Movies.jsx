import React from "react";
import Sidebar from "../components/Sidebar";
import Categorysheader from "../components/Categorysheader";
import CardSlider from "../components/CardSlider";

const Movies = () => {
  return (
    <div className=" w-full h-[calc(100vh-80px)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className=" lg:relative w-full h-full overflow-scroll show-scroll">
        {/* categorys */}
        <div className="slider-container w-full lg:mx-auto flex flex-col gap-10 bg-[#070140] py-5 px-5 lg:py-10 lg:px-10">
          <div className="flex flex-col gap-4  lg:gap-5 px-2 md:px-6 lg:px-2">
            <Categorysheader title={"Movies"} link={"movies"} />
            <CardSlider />
            <CardSlider />
            <CardSlider />
            <CardSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
