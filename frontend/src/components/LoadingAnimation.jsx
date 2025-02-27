import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <motion.div className="lg:w-[340px] bg-gray-800  shadow-lg animate-pulse lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative  mr-3">
      <div className="lg:w-[340px]  lg:h-[200px] md:w-[170px] h-[180px] min-w-[140px] rounded-md cursor-pointer overflow-hidden relative mr-3">
        <img src={""} alt="streamy" className="w-full h-full lg:hidden block" />
        <img src={""} alt="streamy" className="w-full h-full lg:block hidden" />
        <div className=" opacity-0 absolute top-0 w-[100%] h-full flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box"></div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;
