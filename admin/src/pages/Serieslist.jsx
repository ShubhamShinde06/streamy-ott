import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi";

const Serieslist = () => {
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  return (
    <div className=" w-full h-full flex p-2 xl:p-5">
      <Sidebar />
      <div className=" w-full xl:w-[calc(100vw-20vw)] xl:pl-5">
        <Header tag={"Web Series List"} />
        <div className="w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b  from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg  -white/20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll show-scroll">
          <table className="w-full">
            <thead className=" text-xl border-b-2 border-[rgba(255,255,255,0.22)]">
              <tr>
                <th className=" py-3">ID</th>
                <th>NAME</th>
                <th>RATING</th>
                <th>VIEWS</th>
                <th>CREATE DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody className="text-xl text-center backdrop-blur-sm bg-white/10">
              <tr>
                <td className=" py-2">1</td>
                <td className="">you</td>
                <td>7/10</td>
                <td>69</td>
                <td>12/10/2003</td>
                <td className=" h-[50px] flex items-center gap-4 justify-center">
                  <button className=" bg-red-200 text-2xl px-2 py-2 text-red-600 rounded-full"><RiDeleteBinLine/></button>
                  <button className=" bg-blue-200 text-2xl px-2 py-2 text-blue-600 rounded-full"><TfiWrite/></button>
                </td>
              </tr>

              <tr>
                <td className=" py-2">1</td>
                <td className="">you</td>
                <td>7/10</td>
                <td>69</td>
                <td>12/10/2003</td>
                <td className=" h-[50px] flex items-center gap-4 justify-center">
                  <button className=" bg-red-200 text-2xl px-2 py-2 text-red-600 rounded-full"><RiDeleteBinLine/></button>
                  <button className=" bg-blue-200 text-2xl px-2 py-2 text-blue-600 rounded-full"><TfiWrite/></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Serieslist;


