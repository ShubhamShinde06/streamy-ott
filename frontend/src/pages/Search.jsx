import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { IoIosSearch } from "react-icons/io";
import Categorysheader from "../components/Categorysheader";
import { AiOutlineLike } from "react-icons/ai";
import { FrontendContext } from "../context/frontendContext";

const Search = () => {
  const { allData } = useContext(FrontendContext);
  const [search, setSearch] = useState();
  const [filterData, setFilterData] = useState([]);
  const [change, setChange] = useState("");
  const [category, setCategory] = useState([]);
  
  // Function to handle category click
  const categoryFilter = (categoryItem) => {
    if (category.includes(categoryItem)) {
      setCategory(prev => prev.filter(item => item !== categoryItem));
    } else {
      setCategory(prev => [...prev, categoryItem]);
    }
  };

  const applyFilter = () => {
    if (!allData || !Array.isArray(allData)) return;
    let filteredData = allData.filter(
      (item) =>
        item && // Ensure item is not undefined/null
        ((item.series_name &&
          typeof item.series_name === "string" &&
          item.series_name.toLowerCase().includes(search?.toLowerCase())) ||
          (item.title &&
            typeof item.title === "string" &&
            item.title.toLowerCase().includes(search?.toLowerCase())))
    );
    setFilterData(filteredData);
  };


  useEffect(() => {
    applyFilter();
  }, [search, allData]);
  

  return (
    <div className="w-full h-[calc(100vh-80px)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className="w-full h-full lg:flex py-5 px-5 lg:py-10 lg:px-5">
        <div className="lg:w-1/4 w-full">
          <div className="backdrop-blur-sm bg-white/15 flex items-center px-3 py-3 w-full rounded-md">
            <IoIosSearch className="text-[25px]" />
            <input
              type="text"
              placeholder="Search for title, genres "
              className="flex-1 bg-transparent outline-none px-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center lg:items-start lg:flex-col gap-3 py-2 lg:py-32 lg:px-3 lg:text-[20px] overflow-scroll show-scroll">
            {[
              "series",
              "movie",
              "Horror",
              "Romance",
              "Action",
              "Thriller",
              "Drama",
              "Mistery",
              "Sci-Fi",
            ].map((item) => (
              <div
                key={item}
                onClick={() => {
                  setChange(item);
                  categoryFilter(item); // Pass the item directly to categoryFilter
                }}
                className={`py-2 w-full rounded-md px-2 text-xl cursor-pointer transition-all ${
                  change === item
                    ? "backdrop-blur-sm bg-white/15 text-white font-semibold"
                    : "text-gray-300"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:flex-1 h-full lg:px-5 py-1 overflow-scroll show-scroll">
          <Categorysheader title={"Top Searches"} link={"search"} />
          <div className=" lg:grid lg:grid-cols-4 gap-3 py-4 h-full">
            {filterData?.map((item, index) => (
              <div
                key={index}
                className="lg:h-[320px] rounded-md flex flex-col lg:flex lg:flex-row gap-2 overflow-hidden"
              >
                <img
                  src={item.image[0]}
                  alt=""
                  className="lg:block hidden w-full"
                />
                {/* phone */}
                <div className="flex gap-3 lg:hidden mt-5">
                  <div className=" max-w-[180px] rounded-md overflow-hidden">
                    <img src={item.image[1]} alt="" />
                  </div>
                  <div className=" flex flex-col justify-between mt-2">
                    <div className=" flex flex-col gap-2 ">
                      <div>
                        <h1 className="text-xl line-clamp-1">
                          {item.series_name || item?.title}
                        </h1>
                        <p className=" text-gray-500 ">{item?.category}</p>
                      </div>
                      <div className="flex gap-2 items-center w-full">
                        <span className="bg-white text-black px-1 rounded-md text-xs">
                          IMDB
                        </span>
                        <span className="text-xs">{item.rating}/10</span>
                        <span className="ml-2">
                          <AiOutlineLike className="text-xl" />
                        </span>
                        <p className="text-xs">{item.likeCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
