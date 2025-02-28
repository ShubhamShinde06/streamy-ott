import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { server } from "../App";
import { format } from "timeago.js";
import { MdDoneAll, MdRemoveDone } from "react-icons/md";

const User = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(server + "/api/auth/users-get");
        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // Call the function inside useEffect
  }, []);

  return (
    <div className="w-full h-full flex p-2 xl:p-5">
      <Sidebar />
      <div className="w-full xl:w-[calc(100vw-20vw)] xl:pl-5">
        <Header tag={"Users"} />
        <div className="w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b  from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg  -white/20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll show-scroll">
          <table className="w-full">
            <thead className=" text-xl  backdrop-blur-sm bg-white/10 uppercase">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>Sign up</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody className="text-xl text-center">
              {data.map((item, index) => (
                <>
                  <tr
                    key={index + 1}
                    className="border-b-2 border-[rgba(255,255,255,0.22)]"
                  >
                    <td className=" py-2">{index + 1}</td>
                    <td className="">{item.name}</td>
                    <td>{item.email}</td>
                    <td>{format(item.createdAt)}</td>
                    <td className="flex justify-center text-2xl">
                      {item.isVerified === true ? (
                        <MdDoneAll />
                      ) : (
                        <MdRemoveDone />
                      )}
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

export default User;
