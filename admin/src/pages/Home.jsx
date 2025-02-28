import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashborad from "../components/Dashborad";

const Home = ({setToken}) => {
  return (
    <div className=" w-full h-full flex p-2 xl:p-5">
      <Sidebar setToken={setToken} />
      <div className=" w-full xl:w-[calc(100vw-20vw)] xl:pl-5">
        <Header tag={"Dashborad"} />
        <Dashborad />
      </div>
    </div>
  );
};

export default Home;
