import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiUser, CiViewList } from "react-icons/ci";
import { IoAddCircleOutline, IoExitOutline } from "react-icons/io5";
import { PiSquaresFour } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";
import { LuUsersRound } from "react-icons/lu";
import { LiaCommentSolid } from "react-icons/lia";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AdminContext } from "../context/adminContext";
import { MdLaptopChromebook } from "react-icons/md";

const Sidebar = () => {
  const { sideMenu } = useContext(AdminContext);

  const [open, setOpen] = useState(false);

  return (
    <div
      className={` ${
        sideMenu
          ? " block absolute left-2 z-10 w-[70vw] md:w-[30vw] xl:hidden"
          : " hidden left-0"
      } xl:block w-[20vw] h-[calc(100vh-40px)] [ p-2 md:p-5 lg:p-5 ] bg-gradient-to-b from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg border-[1px] border-solid border-white border-opacity-20 rounded-2xl shadow-black/70 shadow-2xl`}
    >
      {/* logo */}
      <div className=" border-b-2 border-[rgba(255,255,255,0.22)] pb-4">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold logo">STREAMY</h1>
        </Link>
      </div>

      <div className=" border-b-2 border-[rgba(255,255,255,0.22)] py-5 flex justify-between items-center">
        <div className=" flex gap-4">
          {/* user_img */}
          <div className="py-3 px-3 rounded-md backdrop-blur-sm bg-white/10 flex items-center text-2xl">
            <CiUser />
          </div>
          <div className=" flex flex-col justify-center">
            <p className=" text-[13px]">Admin</p>
            <h1 className=" font-bold">John Doe</h1>
          </div>
        </div>
        {/* logout_icon */}
        <div className="py-3 px-3 rounded-md backdrop-blur-sm cursor-pointer bg-white/10 border flex items-center text-xl">
          <IoExitOutline />
        </div>
      </div>

      <ul className="flex flex-col gap-4 py-10">
        <NavLink
          to={"/"}
          className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
        >
          <PiSquaresFour /> <span>DASHBORAD</span>
        </NavLink>
        <NavLink
          to={"/catalog"}
          className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
        >
          <TbMovie /> <span>CATALOG</span>
        </NavLink>
        <NavLink
          to={"/users"}
          className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
        >
          <LuUsersRound /> <span>USERS</span>
        </NavLink>
        <NavLink
          to={"/comments"}
          className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
        >
          <LiaCommentSolid /> <span>COMMENTS</span>
        </NavLink>
        <NavLink
          to={"/reviews"}
          className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
        >
          <FaStarHalfAlt /> <span>REVIEWS</span>
        </NavLink>
        <div
          onClick={()=>setOpen(!open)}
          className="flex items-center justify-between text-xl py-2 px-2 rounded-md side-menu-hover cursor-pointer"
        >
          <div className=" flex items-center gap-2">
            <MdLaptopChromebook /> <span>Pages</span>
          </div>
          {open ? (
            <div
              onClick={()=>setOpen(!open)}
              className="text-3xl cursor-pointer"
            >
              <MdKeyboardArrowUp />
            </div>
          ) : (
            <div className="text-3xl cursor-pointer">
              <MdKeyboardArrowDown />
            </div>
          )}
        </div>
        {open ? (
          <div className=" flex flex-col gap-2 py-2 px-2  rounded-md backdrop-blur-sm bg-white/5">
            <NavLink
              to={"/uploadM"}
              className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
            >
              <IoAddCircleOutline /> <span>ADD MOVIE</span>
            </NavLink>
            <NavLink
              to={"/uploadS"}
              className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
            >
              <IoAddCircleOutline /> <span>ADD SERIES</span>
            </NavLink>
            <NavLink
              to={"/add-item"}
              className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
            >
              <CiViewList /><span>MOVIES LISTS</span>
            </NavLink>
            <NavLink
              to={"/add-item"}
              className="flex items-center gap-2 text-xl py-2 px-2 rounded-md side-menu-hover"
            >
              <CiViewList /><span>SERIES LIST</span>
            </NavLink>
          </div>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
