import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Categorysheader from "../components/Categorysheader";
import { useEffect } from "react";
import axios from "axios";
import Cards from "../components/Cards";
import Cardsitem from "../components/Card";
import { server } from "../App";

const Movies = () => {
  const [Data, setData] = useState([]);

  const getContent = async () => {
    try {
      const response = await axios.get(server +"api/movies/get-movies");
      if (response.data.success) {
        console.log(response.data.movies);
        setData(response.data.movies);
      } else {
        //toast.error(response.data.message)
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error(error.message);
    }
  };
  useEffect(() => {
    getContent();
  }, []);

  return (
    <div className=" w-full h-[calc(100vh-80px)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className=" lg:relative w-full h-full overflow-scroll show-scroll">
        {/* categorys */}
        <div className="slider-container w-full lg:mx-auto flex flex-col gap-10 bg-[#070140] py-5 px-5 lg:py-10 lg:px-10">
          <div className="flex flex-col gap-4  lg:gap-5 px-2 md:px-6 lg:px-2 scroll-hover">
            <Categorysheader title={"Movies"} link={"movies"} />
            <div className=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
              {Data.map((item, index) => (
                <Cardsitem
                  key={index}
                  id={item._id}
                  category={item.category}
                  img1={item.image[0]}
                  img2={item.image[1]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
