import React, { useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { TfiCup } from "react-icons/tfi";

const Listbox = (props) => {
  const [refresh, setRefresh] = useState(false); // Initial key state

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="w-full py-4 px-6 backdrop-blur-sm bg-white/5 rounded-xl">
      <div className=" flex justify-between items-center">
        <div className=" flex items-center gap-3">
          <TfiCup className="text-2xl" />
          <h1 className="text-2xl">{props.tabelName}</h1>
        </div>
        <div>
          <TbRefresh
            onClick={handleRefresh}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>
      <table className=" w-full overflow-scroll ">
        <thead className=" text-center text-[#ffffffa6]">
          <tr className=" border-b-2">
            <th className="py-5">ID</th>
            <th>TITLE</th>
            <th className=" uppercase">director</th>
            <th>RATING</th>
          </tr>
        </thead>
        {
          props?.data?.map((item, index) => (
            <tbody className=" text-center">
          <tr>
            <td className="py-2">{index}</td>
            <td >{item.title || item.series_name }</td>
            <td >{item.director}</td>
            <td>{item.rating}/10</td>
          </tr>
        </tbody>
          ))
        }
        
      </table>
    </div>
  );
};

export default Listbox;
