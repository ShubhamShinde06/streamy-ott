import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { IoIosSearch } from "react-icons/io";
import Categorysheader from "../components/Categorysheader";
import { AiOutlineLike } from "react-icons/ai";
import { FrontendContext } from "../context/frontendContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const Search = () => {
  const { allData, loading } = useContext(FrontendContext);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [menu, setMenu] = useState("All");

  const applyFilter = () => {
    if (!allData || !Array.isArray(allData)) return;

    let searchLower = search.toLowerCase();

    let filtered = allData.filter((item) => {
      const matchesSeriesName =
        item.series_name &&
        typeof item.series_name === "string" &&
        item.series_name.toLowerCase().includes(searchLower);

      const matchesTitle =
        item.title &&
        typeof item.title === "string" &&
        item.title.toLowerCase().includes(searchLower);

      // Convert genre to an array & ensure all elements are strings
      let genres = [];
      if (typeof item.genre === "string") {
        genres = item.genre.split(",").map((g) => g.trim().toLowerCase());
      } else if (Array.isArray(item.genre)) {
        genres = item.genre
          .filter((g) => typeof g === "string") // Ensure only strings
          .map((g) => g.toLowerCase());
      }

      const matchesGenre = genres.some((g) => g.includes(searchLower));

      return matchesSeriesName || matchesTitle || matchesGenre;
    });

    // **Filter by Category (Movies/Series)**
    if (menu === "movie" || menu === "series") {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === menu,
      );
    }

    // **Dynamic Genre Filtering**
    if (menu !== "All" && menu !== "movie" && menu !== "series") {
      let menuLower = menu.toLowerCase();
      filtered = filtered.filter((item) => {
        let itemGenres = [];
        if (typeof item.genre === "string") {
          itemGenres = item.genre.split(",").map((g) => g.trim().toLowerCase());
        } else if (Array.isArray(item.genre)) {
          itemGenres = item.genre
            .filter((g) => typeof g === "string")
            .map((g) => g.toLowerCase());
        }
        return itemGenres.includes(menuLower); // Check if genre matches selected menu
      });
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [search, menu, allData]);

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
              "All",
              "movie",
              "series",
              "action",
              "comedy",
              "drama",
              "horror",
              "thriller",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setMenu(category)}
                className={`py-2 w-full rounded-md px-2 text-xl cursor-pointer text-start transition-all ${
                  menu === category
                    ? "backdrop-blur-sm bg-white/15 text-white font-semibold"
                    : "text-gray-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="lg:flex-1 h-full lg:px-5 py-1 overflow-scroll show-scroll">
          <Categorysheader title={"Top Searches"} link={"search"} />
          <div className="lg:grid lg:grid-cols-4 gap-3 py-4 h-full flex-col-reverse">
            {loading ? (
              <div className="lg:w-[66vw] w-full h-full flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              filteredData.map((item, index) => (
                <Link
                  to={
                    item.category === "series"
                      ? `/seriesplayer/${item._id}`
                      : `/movieplayer/${item._id}`
                  }
                  key={index}
                  className="lg:h-[320px] rounded-md flex flex-col lg:flex lg:flex-row gap-2 overflow-hidden"
                >
                  <img
                    src={item.image[0]}
                    alt="image"
                    className="lg:block hidden w-full"
                  />
                  {/* Phone */}
                  <div className="flex gap-3 lg:hidden mt-5">
                    <div className="max-w-[180px] rounded-md overflow-hidden">
                      <img src={item.image[1]} alt="image" />
                    </div>
                    <div className="flex flex-col justify-between mt-2">
                      <div className="flex flex-col gap-2">
                        <div>
                          <h1 className="text-xl line-clamp-1">
                            {item.series_name || item?.title}
                          </h1>
                          <p className="text-gray-500">{item?.category}</p>
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
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
