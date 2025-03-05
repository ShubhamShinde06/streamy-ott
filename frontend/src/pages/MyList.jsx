import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Categorysheader from "../components/Categorysheader";
import axios from "axios";
import { server } from "../App";
import { useUserStore } from "../store/userStore";
import { motion } from "framer-motion";
import Cardsitem from "../components/Card";
import { Link } from "react-router-dom";

const MyList = () => {
  const { user } = useUserStore();
  const userId = user?._id; //global use
  const [loading, setLoading] = useState(false);

  const [Data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}api/mylist/get/${userId}`);
        const data = response.data.data;

        if (data.length > 0) {
          const formattedData = data.map((item) => ({
            id: item.itemId?._id,
            type: item.itemId.category,
            imageOne: item.itemId.image[0],
            imageTwo: item.itemId.image[1],
          }));

          setData(formattedData);
        } else {
          console.log("No items found");
        }
      } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className=" w-full h-[calc(100vh-auto)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className=" lg:relative w-full h-full overflow-scroll show-scroll flex justify-center">
        {/* categorys */}
        <div className="slider-container w-full lg:mx-auto flex flex-col gap-10  py-5 px-5 lg:py-10  lg:px-10">
          <div className="flex flex-col gap-4 lg:gap-5 px-2 md:px-6 lg:px-2 ">
            <Categorysheader title={"My List"} link={"saved"} />
            <div className=" grid xl:grid-cols-0 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3 ">
              {loading ? (
                <>
                  {new Array(12).fill(null).map((c, index) => {
                    <motion.div
                      key={index}
                      className="lg:w-[340px] bg-gray-800 shadow-lg animate-pulse lg:h-[200px] md:w-[170px] h-[220px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative  mr-3"
                    >
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
                    </motion.div>;
                  })}
                </>
              ) : (
                <>
                  {Data.length > 0 ? (
                    Data.map((item, index) => (
                      <Cardsitem
                        key={index}
                        id={item.id}
                        category={item.type}
                        img1={item.imageOne}
                        img2={item.imageTwo}
                      />
                    ))
                  ) : (
                    <>
                      <div className="w-[90vw] h-[80vh] flex flex-col gap-2 items-center justify-center absolute">
                        <p className=" text-gray-400">Add some Movies/Shows</p>
                        <Link to={'/home'} className="bg-white text-black px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2">Go to Home</Link>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyList;
