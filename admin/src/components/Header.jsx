import React, { useContext } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { AdminContext } from "../context/adminContext";
import { RiMenu2Line } from "react-icons/ri";

const Header = ({ tag }) => {
  const { sideMenu, setSideMenu } = useContext(AdminContext);

  return (
    <div className=" w-full h-20 flex px-5 items-center justify-between bg-gradient-to-b from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg border-[1px] border-solid border-white border-opacity-20 rounded-2xl shadow-black/70 shadow-2xl">
      <h1 className="text-3xl font-bold logo xl:hidden">STREAMY</h1>
      <button className="xl:hidden block py-2 px-3 text-2xl rounded-md backdrop-blur-sm bg-white/10 border">
        {sideMenu ? (
          <RiMenu2Line onClick={() => setSideMenu(false)} />
        ) : (
          <RiMenu3Fill onClick={() => setSideMenu(true)} />
        )}
      </button>

      {/* big screen */}
      <h1 className=" hidden xl:block text-3xl ">{tag}</h1>
      {/* <button
            className='hidden xl:block py-2 px-6 rounded-md backdrop-blur-sm bg-white/10 border'
        >
            ADD ITEM
        </button> */}
    </div>
  );
};

export default Header;
