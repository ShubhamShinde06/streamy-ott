import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Categorysheader from "../components/Categorysheader";
import { useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import Cardsitem from "../components/Card";
import { server } from "../App";
import { motion } from "framer-motion";

const Movies = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(server + "api/movies/get-movies");
      if (response.data.success) {
        setData(response.data.movies);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getContent();
  }, []);

  const loadData = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  return (
    <div className=" w-full h-[calc(100vh-auto)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className=" lg:relative w-full h-full overflow-scroll show-scroll">
        {/* categorys */}
        <div className="slider-container w-full lg:mx-auto flex flex-col gap-10 bg-[#070140] py-5 px-5 lg:py-10 lg:px-10">
          <div className="flex flex-col gap-4  lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"Movies"} link={"movies"} />
            <div className=" grid xl:grid-cols-0 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3">
              {loading ? (
                <>
                  {loadData.map((item) => (
                    <motion.div className="lg:w-[340px] bg-gray-800 shadow-lg animate-pulse lg:h-[200px] md:w-[170px] h-[220px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative  mr-3">
                      <div className="lg:w-auto lg:h-[260px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mr-3">
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
                </>
              ) : (
                <>
                  {Data.map((item, index) => (
                    <Cardsitem
                      key={index}
                      id={item._id}
                      category={item.category}
                      img1={item.image[0]}
                      img2={item.image[1]}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
