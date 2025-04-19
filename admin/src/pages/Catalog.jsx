import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { AdminContext } from "../context/adminContext";
import { format } from "timeago.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../App";
import Loader from "../components/Loader";
import { IoIosSearch } from "react-icons/io";

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  

  const { contentData, setReCall } = useContext(AdminContext);

  const applyFilter = () => {
    if (!contentData || !Array.isArray(contentData)) return;

    let searchLower = search.toLowerCase();
    let filtered = contentData.filter((item) => {
      const matchesSeriesName = item.series_name
        ?.toLowerCase()
        .includes(searchLower);
      const matchesTitle = item.title?.toLowerCase().includes(searchLower);
      const genres =
        typeof item.genre === "string"
          ? item.genre.split(",").map((g) => g.trim().toLowerCase())
          : Array.isArray(item.genre)
          ? item.genre
              .filter((g) => typeof g === "string")
              .map((g) => g.toLowerCase())
          : [];
      const matchesGenre = genres.some((g) => g.includes(searchLower));

      return matchesSeriesName || matchesTitle || matchesGenre;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [search, contentData]);

  const removeSeries = async (id) => {
    try {
      const response = await axios.delete(
        server + `/api/series/delete-series/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setReCall((prev) => !prev)
        await contentData;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeMovie = async (id) => {
    try {
      const response = await axios.delete(server + `/api/movies/delete-movie/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setReCall((prev) => !prev)
        await contentData;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  console.log(filteredData)

  return (
    <div className=" w-full h-full flex p-2 xl:p-5">
      <Sidebar />
      <div className=" w-full xl:w-[calc(100vw-20vw)] xl:pl-5">
        <Header tag={"Content"} />
        <div className="w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b  from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg  -white/20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll show-scroll">
          <div className="w-full h-20  flex items-center justify-center">
            <IoIosSearch className="text-[25px]" />
            <input
              type="text"
              placeholder="Search for title, genres "
              className="flex-1 bg-transparent outline-none px-3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table className="w-full">
            <thead className=" text-xl  backdrop-blur-sm bg-white/10 ">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>POSTER</th>
                <th>RATING</th>
                <th>Likes</th>
                <th>CREATE DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody className="text-xl text-center">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <>
                    <tr
                      key={index + 1}
                      className="border-b-2 border-[rgba(255,255,255,0.22)]"
                    >
                      <td className=" py-2">{index + 1}</td>
                      <td className="">
                        {item.category === "series"
                          ? item.series_name
                          : item.title}
                      </td>
                      <td>{item?.poster === true ? 'True' : 'False'}</td>
                      <td>{item.rating}</td>
                      <td>{item.visitCount}</td>
                      <td>{format(item.createdAt)}</td>
                      <td className=" h-[50px] flex items-center gap-4 justify-center">
                        <button
                          onClick={
                            item.category === "series"
                              ? () => removeSeries(item._id)
                              : () => removeMovie(item._id)
                          }
                          className=" bg-red-200 text-2xl px-2 py-1 text-red-600 rounded-full"
                        >
                          <RiDeleteBinLine />
                        </button>
                        <Link
                          to={
                            item.category === "series"
                              ? `/updateS/${item._id}`
                              : `/updateM/${item._id}`
                          }
                          className=" bg-blue-200 text-2xl px-2 py-1 text-blue-600 rounded-full"
                        >
                          <TfiWrite />
                        </Link>
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <div className="w-full flex justify-center py-4  absolute">
                  <Loader />
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
