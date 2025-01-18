import React, { useState } from "react";
import { TbRefresh } from "react-icons/tb";
import { TfiCup } from "react-icons/tfi";

const Listbox = ({tabelName, tableIcon, id, title, category, rating}) => {

    const [refresh, setRefresh] = useState(false); // Initial key state
    
      const handleRefresh = () => {
        setRefresh(!refresh);
      };

  return (
    <div className="w-full py-4 px-6 backdrop-blur-sm bg-white/5 rounded-xl">
      <div className=" flex justify-between items-center">
        <div className=" flex items-center gap-3">
          <TfiCup className="text-2xl" />
          <h1 className="text-2xl">Top items</h1>
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
            <th>CATEGORY</th>
            <th>RATING</th>
          </tr>
        </thead>
        <tbody className=" text-center">
          <tr>
            <td className="py-2">1</td>
            <td>demo1</td>
            <td>action</td>
            <td>7/10</td>
          </tr>
          <tr>
            <td className="py-2">2</td>
            <td>demo2</td>
            <td>action</td>
            <td>7/10</td>
          </tr>
          <tr>
            <td className="py-2">3</td>
            <td>demo3</td>
            <td>action</td>
            <td>7/10</td>
          </tr>
          <tr>
            <td className="py-2">4</td>
            <td>demo4</td>
            <td>action</td>
            <td>7/10</td>
          </tr>
          <tr>
            <td className="py-2">5</td>
            <td>demo5</td>
            <td>action</td>
            <td>7/10</td>
          </tr>
          <tr>
            <td className="py-2">6</td>
            <td>demo6</td>
            <td>action</td>
            <td>7/10</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Listbox;
