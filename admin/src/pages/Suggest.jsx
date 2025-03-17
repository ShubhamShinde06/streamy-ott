import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { server } from "../App";
import { format } from "timeago.js";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Suggest = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      const fetchReports = async () => {
        try {
          const response = await axios.get(server + "/api/suggest/get");
          if (response.data.success) {
            setData(response.data.data);
            console.log(response.data.data)
          } else {
            console.error("Failed to fetch reports");
          }
        } catch (error) {
          console.error("Error fetching reports:", error);
        }
      };
  
      fetchReports();
    }, []);
  
    const removeReport = async (itemId) => {
        setLoading(true)
      try {
        const response = await axios.post(server + `/api/suggest/delete`, {
          itemId,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigation(0, { replace: true });
          }, 500);
          setLoading(false)
        } else {
          toast.error(response.data.message);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false)
      }
    };
  return (
    <div className="w-full h-full flex p-2 xl:p-5">
    <Sidebar />
    <div className="w-full xl:w-[calc(100vw-20vw)] xl:pl-5">
      <Header tag={"Reviews"} />
      <div className="w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b  from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg  -white/20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll show-scroll">
        <table className="w-full">
          <thead className=" text-xl  backdrop-blur-sm bg-white/10 uppercase">
            <tr>
              <th>ID</th>
              <th>user ID</th>
              <th>TITLE</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody className="text-xl text-center">
            {data.length > 0
            ?
            data.map((item, index) => (
              <>
                <tr
                  key={index + 1}
                  className="border-b-2 border-[rgba(255,255,255,0.22)]"
                >
                  <td className=" py-2">{index + 1}</td>
                  <td>{item.userId}</td>
                  <td>{item.title}</td>
                  <td>
                    <button
                      onClick={() => removeReport(item._id)}
                      className=" bg-red-200 text-2xl px-2 py-1 text-red-600 rounded-full"
                    >
                      {loading ? <Loader/> : <RiDeleteBinLine />}
                    </button>
                  </td>
                </tr>
              </>
            ))
          :
        
          <div  className="w-full flex justify-center py-4  absolute">
            <Loader/>
          </div>
        }
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Suggest