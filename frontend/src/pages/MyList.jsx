import React from 'react'
import Sidebar from "../components/Sidebar";
import Categorysheader from "../components/Categorysheader";


const MyList = () => {
  return (
    <div className=" w-full h-[calc(100vh-80px)] lg:h-[100vh] lg:flex">
    <Sidebar />
    <div className=" lg:relative w-full h-full overflow-scroll show-scroll flex items-center justify-center">
      {/* categorys */}
      {/* <div className="slider-container w-full lg:mx-auto flex flex-col gap-10 bg-[#070140] py-5 px-5 lg:py-10 lg:px-10">
        <div className="flex flex-col gap-4  lg:gap-5 px-2 md:px-6 lg:px-2">
          <Categorysheader title={"My List"} link={"movies"} />
       
        </div>
      </div> */}
      <h1>Comeing Soon...</h1>
    </div>
  </div>
  )
}

export default MyList