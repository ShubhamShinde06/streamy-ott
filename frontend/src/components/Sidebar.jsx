import React from "react";
import { FaRegUser, FaUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { TbMovie } from "react-icons/tb";
import { LiaTvSolid } from "react-icons/lia";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { useUserStore } from "../store/userStore";
import { RiSearch2Fill } from "react-icons/ri";

const Sidebar = () => {
  const { logout } = useUserStore();

  const handleLogout = () => {
    logout();
  };

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
        <div onClick={handleLogout} className="icon-hover cursor-pointer">
          <IoExitOutline />
        </div>
      </div>
      {/* small device */}
      <div className=" lg:hidden fixed bottom-0 backdrop-blur-sm bg-black/30 text-gray-400 text-[0px] w-full z-10 flex items-center justify-around px-0 py-2">
        {[
          [<AiFillHome />, "Home"],
          [<RiSearch2Fill />, "Search"],
          //[<IoAdd />, "saved"],
          [<FaUser />, "Profile"],
        ].map((item) => (
          <div className="flex flex-col items-center justify-center">
            <NavLink
              to={`/${item[1]}`}
              key={item}
              className="flex flex-col items-center justify-center"
            >
              <div className="icon-hover transition-all text-xl">{item[0]}</div>
              <p className="text-[15px]">{item[1]}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
