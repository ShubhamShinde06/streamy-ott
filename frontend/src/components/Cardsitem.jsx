import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { CgAdd } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { IoInformationCircleOutline } from "react-icons/io5";

const Cardsitem = () => {
  return (
    <div className="lg:w-[340px] xl:w-[300px] lg:h-[200px] min-w-[150px] h-[240px] border rounded-md cursor-pointer overflow-hidden relative hover-card mr-3 ">

      <div className=" hidden flex-col gap-4 absolute bottom-0 w-[100%] h-1/2 py-2 px-4 card-info">
        <div className=" text-3xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AiFillPlayCircle />
            <CgAdd />
            <BiLike />
          </div>
          <div>
            <IoInformationCircleOutline />
          </div>
        </div>
        <p className=" text-[18px] text-[#596487]">IMDB 6.9 <span className="text-[10px] p-2">&#x25CF;</span> 1h 54m</p>
      </div>
    </div>
  );
};
export default Cardsitem;
