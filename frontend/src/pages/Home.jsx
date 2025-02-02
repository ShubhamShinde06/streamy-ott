import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import PosterSlider from "../components/PosterSlider";
import { FrontendContext } from "../context/frontendContext";
import Cards from "../components/Cards";
import Categorysheader from "../components/Categorysheader";

const Home = () => {
  const { new_release, posterdata, moviedata, seriesData, comdeyData, actionData, animationData,crimeData, dramaData, fantasyData, historicalData, horrorData, romanceData, sci_fiData, thrillerData } =
    useContext(FrontendContext);

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
            <Categorysheader title={"New Release"} link={"home"} />
            <Cards Data={new_release} />
          </div>
          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"Movies"} link={"movies"} />
            <Cards Data={moviedata} />
          </div>
          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"Web Series"} link={"shows"} />
            <Cards Data={seriesData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Comdey</h1>
            </div>
            <Cards Data={comdeyData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Action</h1>
            </div>
            <Cards Data={actionData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Animation</h1>
            </div>
            <Cards Data={animationData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Crime</h1>
            </div>
            <Cards Data={crimeData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Drama</h1>
            </div>
            <Cards Data={dramaData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Fantasy</h1>
            </div>
            <Cards Data={fantasyData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Historical</h1>
            </div>
            <Cards Data={historicalData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Horror</h1>
            </div>
            <Cards Data={horrorData} />
          </div>

          {/* <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Romance</h1>
            </div>
            <Cards Data={romanceData} />
          </div> */}

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Sci-Fi</h1>
            </div>
            <Cards Data={sci_fiData} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">Thriller</h1>
            </div>
            <Cards Data={thrillerData} />
          </div>


        </div>
      </div>
    </div>
  );
};

export default Home;
