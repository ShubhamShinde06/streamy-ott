import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { AiOutlineHome } from "react-icons/ai";
import { TbMovie } from "react-icons/tb";
import { LiaTvSolid } from "react-icons/lia";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import {NavLink} from 'react-router-dom'


const Sidebar = () => {
  return (
    <div className='lg:w-[10%] xl:w-[8%] h-full text-3xl lg:flex flex-col items-center justify-between py-10 hidden side-bar'>
        <NavLink to={'/profile'} className='icon-hover text-2xl'>
            <FaRegUser />
        </NavLink>
        <div className=' h-[70%] flex flex-col items-center justify-evenly'>
            <NavLink to={'/search'} className='icon-hover'>
             <IoSearchOutline />
            </NavLink>
            <NavLink to={'/custome'} className='icon-hover'>
            <HiOutlineAdjustmentsHorizontal />
            </NavLink>
            <NavLink to={'/'} className='icon-hover'>
             <AiOutlineHome />
            </NavLink>
            <NavLink to={'/movie'} className='icon-hover'>
             <TbMovie />
            </NavLink>
            <NavLink to={'/seires'} className='icon-hover'>
            <LiaTvSolid />
            </NavLink>
            <NavLink to={'/saved'} className='icon-hover'>
            <MdOutlineLibraryAdd />
            </NavLink>
          
        </div>
        <NavLink to={'/logout'} className='icon-hover'>
         <IoExitOutline />
        </NavLink>
    </div>
  )
}

export default Sidebar