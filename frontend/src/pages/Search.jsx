import React from "react";
import Sidebar from "../components/Sidebar";
import { IoIosSearch } from "react-icons/io";
import Categorysheader from "../components/Categorysheader";
import { AiOutlineLike } from "react-icons/ai";

const Search = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className="w-full h-full lg:flex py-5 px-5 lg:py-10 lg:px-5 ">
        <div className="lg:w-1/4 w-full ">
          <div className="backdrop-blur-sm bg-white/15  flex items-center px-3 py-3 w-full rounded-md">
            <IoIosSearch className="text-[25px]" />
            <input
              type="text"
              placeholder="Search for title, genres "
              className="flex-1 bg-transparent outline-none px-3"
            />
          </div>
          <ul className="w-full flex items-center lg:items-start lg:flex-col gap-5 py-2 lg:py-32 lg:px-3 lg:text-[20px] overflow-scroll show-scroll">
            <li className=" w-full lg:w-1/2 py-1 px-4 lg:py-2 lg:px-2 border-2 lg:rounded-md rounded-full lg:text-white lg:bg-transparent bg-white text-black">
              All
            </li>
            <li>Shows</li>
            <li>Movies</li>
            <li>Horror</li>
            <li>Romance</li>
            <li>Action</li>
            <li>Thriller</li>
            <li>Drama</li>
            <li>Mistery</li>
            <li>Sci-fi</li>
          </ul>
        </div>
        <div className="lg:flex-1 h-full lg:px-5 py-1 overflow-scroll show-scroll">
          <Categorysheader title={"Top Searches"} link={'search'} />
          <div className=" lg:grid lg:grid-cols-4 gap-3 py-4 h-full">
            <div className="lg:h-[320px]  rounded-md flex flex-col lg:flex lg:flex-row gap-2 overflow-hidden">
              <img
                src="https://i.pinimg.com/236x/61/f5/0d/61f50d942b871bf23bc3fd4c89ac72a7.jpg"
                alt=""
                className="lg:block hidden"
              />
              <div className="flex gap-3 lg:hidden">
                <div className=" w-1/2 rounded-md overflow-hidden">
                  <img
                    src="https://i.pinimg.com/236x/61/f5/0d/61f50d942b871bf23bc3fd4c89ac72a7.jpg"
                    alt=""
                  />
                </div>
                <div className=" flex flex-col justify-between pb-5 ">
                  <div>
                    <h1 className="text-xl">Humane</h1>
                    <p className=" text-gray-500 ">Show</p>
                  </div>
                  <div className="flex gap-2 items-center w-full">
                    <span className="bg-white text-black px-1 rounded-md text-xs">
                      IMDB
                    </span>
                    <span className="text-xs">7.5/10</span>
                    <span className="ml-2">
                      <AiOutlineLike className="text-xl" />
                    </span>
                    <p className="text-xs">1.2k</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 lg:hidden">
                <div className=" w-1/2 rounded-md overflow-hidden">
                  <img
                    src="https://i.pinimg.com/236x/61/f5/0d/61f50d942b871bf23bc3fd4c89ac72a7.jpg"
                    alt=""
                  />
                </div>
                <div className=" flex flex-col justify-between pb-5 ">
                  <div>
                    <h1 className="text-xl">Humane</h1>
                    <p className=" text-gray-500 ">Show</p>
                  </div>
                  <div className="flex gap-2 items-center w-full">
                    <span className="bg-white text-black px-1 rounded-md text-xs">
                      IMDB
                    </span>
                    <span className="text-xs">7.5/10</span>
                    <span className="ml-2">
                      <AiOutlineLike className="text-xl" />
                    </span>
                    <p className="text-xs">1.2k</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
