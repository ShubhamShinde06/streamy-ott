import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";
import { AdminContext } from "../context/adminContext";
import { format } from "timeago.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Catalog = () => {
  const { contentData } = useContext(AdminContext);

  const removeSeries = async (id) => {
    try {
      const response = await axios.delete(`/api/series/delete-series/${id}`)
      if(response.data.success){
        toast.success(response.data.message)
        setTimeout(() => {
          navigation(0, { replace: true });
        }, 2000);
        await contentData
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  } 

  const removeMovie = async (id) => {
    try {
      const response = await axios.delete(`/api/movies/delete-movie/${id}`)
      if(response.data.success){
        toast.success(response.data.message)
        setTimeout(() => {
          navigation(0, { replace: true });
        }, 2000);
        await contentData
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  } 

  return (
    <div className=" w-full h-full flex p-2 xl:p-5">
      <Sidebar />
      <div className=" w-full xl:w-[calc(100vw-20vw)] xl:pl-5">
        <Header tag={"Content"} />
        <div className="w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b  from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg  -white/20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll show-scroll">
          <table className="w-full">
            <thead className=" text-xl  backdrop-blur-sm bg-white/10 ">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>RATING</th>
                <th>VIEWS</th>
                <th>CREATE DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody className="text-xl text-center">
              {contentData.map((item, index) => (
                <>
                  <tr key={index + 1} className="border-b-2 border-[rgba(255,255,255,0.22)]">
                    <td className=" py-2">{index + 1}</td>
                    <td className="">
                      {item.category === "series"
                        ? item.series_name
                        : item.title}
                    </td>
                    <td>{item.rating}</td>
                    <td>{item.visitCount}</td>
                    <td>{format(item.createdAt)}</td>
                    <td className=" h-[50px] flex items-center gap-4 justify-center">
                      <button onClick={item.category === "series" ? ()=>removeSeries(item._id) : ()=>removeMovie(item._id)} className=" bg-red-200 text-2xl px-2 py-1 text-red-600 rounded-full">
                        <RiDeleteBinLine />
                      </button>
                      <Link to={item.category === 'series' ? `/updateS/${item._id}` : `/updateM/${item._id}`} className=" bg-blue-200 text-2xl px-2 py-1 text-blue-600 rounded-full">
                        <TfiWrite />
                      </Link>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
