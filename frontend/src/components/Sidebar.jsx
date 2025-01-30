import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { TbMovie } from "react-icons/tb";
import { LiaTvSolid } from "react-icons/lia";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

const Sidebar = () => {
  return (
    <>
      {/* big device */}
      <div className=" lg:w-[10%] xl:w-[6%] h-full text-3xl lg:flex flex-col items-center justify-between py-10 hidden side-bar">
        <NavLink to={"/profile"} className="icon-hover text-2xl">
          <FaRegUser />
        </NavLink>
        <div className=" h-[70%] flex flex-col items-center justify-evenly">
          {[
            [<IoSearchOutline />, "/search"],
            [<TbMovie />, "/movies"],
            [<AiOutlineHome />, "/home"],
            [<LiaTvSolid />, "/shows"],
            [<MdOutlineLibraryAdd />, "/saved"],
          ].map((item) => (
            <NavLink
              to={item[1]}
              key={item}
              className="icon-hover transition-all"
            >
              {item[0]}
            </NavLink>
          ))}
        </div>
        <NavLink to={"/logout"} className="icon-hover">
          <IoExitOutline />
        </NavLink>
      </div>
      {/* small device */}
      <div className=" lg:hidden fixed bottom-0 h-[80px] backdrop-blur-sm bg-black/40 text-gray-400 text-[32px] w-full z-10 flex items-center justify-between px-5 py-2">
        {[
          [<CiHome />, "home"],
          [<IoIosSearch />, "search"],
          [<IoAdd />, "saved"],
          [<CiUser />, "profile"]
        ].map((item) => (
          <NavLink
            to={`/${item[1]}`}
            key={item}
            className="icon-hover transition-all"
          >
            {item[0]} 
            <p className="text-[15px]">{item[1]}</p>
          </NavLink>
        ))}
        {/* <NavLink
          to={"/"}
          className=" w-auto flex flex-col items-center justify-center text-center"
        >
          <CiHome className=" font-bold" />
          <p className="text-[15px]">Home</p>
        </NavLink>
        <NavLink
          to={"/search"}
          className=" w-auto flex flex-col items-center justify-between text-center"
        >
          <IoIosSearch />
          <p className="text-[15px]">Search</p>
        </NavLink>
        <NavLink
          to={"/saved"}
          className=" w-auto flex flex-col items-center justify-center text-center"
        >
          <IoAdd />
          <p className="text-[15px]">My List</p>
        </NavLink>
        <NavLink
          to={"/profile"}
          className=" w-auto flex flex-col items-center justify-center text-center"
        >
          <CiUser />
          <p className="text-[15px]">Profile</p>
        </NavLink> */}
      </div>
    </>
  );
};

export default Sidebar;
