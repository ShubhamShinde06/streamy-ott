import React from "react";

const Countbox = ({ icon, title, count }) => {
  return (
    <div className=" w-full py-3 px-3 rounded-md backdrop-blur-sm bg-white/5">
      <p className=" font-bold tracking-wider">{title}</p>
      <div className=" flex items-center justify-between gap-4 my-2">
        <p className=" text-4xl">{count}</p>
        <p className=" text-3xl">{icon}</p>
      </div>
    </div>
  );
};

export default Countbox;
