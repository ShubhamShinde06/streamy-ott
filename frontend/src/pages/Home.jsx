import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import PosterSlider from "../components/PosterSlider";
import { FrontendContext } from "../context/frontendContext";
import Cards from "../components/Cards";
import Categorysheader from "../components/Categorysheader";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { LuBotMessageSquare } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import Suggest from "../components/Suggest";
import { useUserStore } from "../store/userStore";

const Home = () => {
  const { loading, new_release, posterdata, moviedata, seriesData, genreData, chat, setChat } =
    useContext(FrontendContext);

    const {user} = useUserStore()


  const loadCard = [{}, {}, {}, {}, {}];

  // if (loading) {
  //   return (
  //     <>
  //       <motion.div className="relative h-[70vh] md:h-[75vh] lg:h-screen xl:h-[90vh] bg-gray-800  overflow-hidden shadow-lg cursor-pointer animate-pulse">
  //         <div className="absolute inset-0 in-site-color flex flex-col justify-end items-center gap-3 lg:gap-6 lg:items-start p-6 lg:p-14 xl:p-20">
  //           <p className="text-white bg-gray-700 text-lg md:text-xl lg:text-2xl xl:text-3xl w-4/5 hidden lg:block truncate-multiline"></p>
  //           <p className="text-white bg-gray-700 text-xl md:text-lg lg:text-xl xl:text-2xl line-clamp-1"></p>
  //           <div className="flex gap-4 mt-4">
  //             <button className="bg-gray-700 text-black px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2"></button>
  //             <button className="bg-gray-700 text-white px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2"></button>
  //           </div>
  //         </div>
  //       </motion.div>
  //       <div className=" w-full flex items-center gap-3 lg:ml-[100px]">
  //         {loadCard.map((item, index) => (
  //           <motion.div
  //             key={index + 1}
  //             className="lg:w-[340px] bg-gray-700  shadow-lg animate-pulse lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mt-5"
  //           >
  //             <div className="lg:w-[340px]  lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mr-3">
  //               <img
  //                 src={""}
  //                 alt="streamy"
  //                 className="w-full h-full lg:hidden block"
  //               />
  //               <img
  //                 src={""}
  //                 alt="streamy"
  //                 className="w-full h-full lg:block hidden"
  //               />
  //               <div className=" opacity-0 absolute top-0 w-[100%] h-full flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box"></div>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className=" w-full h-[calc(100vh-auto)] lg:h-[100vh] lg:flex relative">
      <Sidebar />
      <div className=" lg:relative w-full h-full overflow-scroll show-scroll">
        {
          loading
          ?
          <>
          <motion.div className="relative h-[70vh] md:h-[75vh] lg:h-screen xl:h-[90vh] bg-gray-800  overflow-hidden shadow-lg cursor-pointer animate-pulse">
          <div className="absolute inset-0 in-site-color flex flex-col justify-end items-center gap-3 lg:gap-6 lg:items-start p-6 lg:p-14 xl:p-20">
            <p className="text-white bg-gray-700 text-lg md:text-xl lg:text-2xl xl:text-3xl w-4/5 hidden lg:block truncate-multiline"></p>
            <p className="text-white bg-gray-700 text-xl md:text-lg lg:text-xl xl:text-2xl line-clamp-1"></p>
            <div className="flex gap-4 mt-4">
              <button className="bg-gray-700 text-black px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2"></button>
              <button className="bg-gray-700 text-white px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2"></button>
            </div>
          </div>
        </motion.div>
        <div className=" w-full flex items-center gap-3 lg:ml-[100px]">
          {loadCard.map((item, index) => (
            <motion.div
              key={index + 1}
              className="lg:w-[340px] bg-gray-700  shadow-lg animate-pulse lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mt-5"
            >
              <div className="lg:w-[340px] lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mr-3">
                <img
                  src={""}
                  alt="streamy"
                  className="w-full h-full lg:hidden block"
                />
                <img
                  src={""}
                  alt="streamy"
                  className="w-full h-full lg:block hidden"
                />
                <div className=" opacity-0 absolute top-0 w-[100%] h-full flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box"></div>
              </div>
            </motion.div>
          ))}
        </div>
          </>
          :
          <>
          {/* poster */}
        <main className="w-full h-auto lg:h-[90%]">
          <PosterSlider Data={posterdata} />
        </main>
        {/* categorys */}
        <div className="slider-container w-full mx-auto h-auto flex flex-col gap-10 bg-[#070140] py-5 lg:py-10 lg:px-10">
          <div className="flex flex-col gap-4 lg:gap-5 pl-2 md:px-6 lg:px-2 scroll-hover">
            <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
              <h1 className="lg:text-3xl text-1xl">New Release</h1>
            </div>
            <Cards Data={new_release} />
          </div>

          <div className="flex flex-col gap-4 lg:gap-5 pl-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"Movies"} link={"movies"} />
            <Cards Data={moviedata} />
          </div>
          <div className="flex flex-col gap-4 lg:gap-5 pl-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"Web Series"} link={"shows"} />
            <Cards Data={seriesData} />
          </div>

          {Object.keys(genreData).map((genre, index) => (
            <div key={index} className="flex flex-col gap-4 lg:gap-5 pl-2">
              <div className="w-full flex justify-between items-center lg:pr-5 text-2xl">
                <h1 className="lg:text-3xl text-1xl">{genre}</h1>
              </div>
              <Cards Data={genreData[genre]} />
            </div>
          ))}
        </div>
          </>
        }
        <div className=" bottom-0 right-5 p-5 rounded-md lg:sticky lg:flex items-center justify-end hidden">
          {
            chat ?
            <div className="w-80 h-full lg:h-auto absolute bottom-20 rounded-md overflow-hidden">
              <Suggest/>
            </div>
            
            :
            ''
          }
          <div onClick={()=>setChat(!chat)} className=" cursor-pointer w-10 h-10 flex items-center justify-center text-2xl rounded-full bg-[#7339e5]">
            {chat ? <RxCross2 /> :<LuBotMessageSquare/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
