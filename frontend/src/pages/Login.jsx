import React, { useState } from "react";
import img from '../assets/LoginImg.png'
import { Link } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  return (
    <div className="bg-color h-[calc(100vh)] text-white px-5 py-5 md:px-[100px] md:py-10 lg:px-[150px] lg:py-[50px]">
      {/* HEADER */}
      <div className="">
        <Link to={'/'}>
          <h1 className="text-4xl font-bold logo">STREAMY</h1>
        </Link>
      </div>

      <div className="w-full mt-8 md:mt-[80px] gap-1 flex md:gap-2 ">
        {/* login & register */}
        <form action="" className="w-full h-[80vh] md:h-full justify-center flex flex-col gap-4 md:gap-6 xl:w-1/2">
          <div className="w-full xl:w-[60%] mb-4 text-center md:text-start">
            <h1 className="md:text-[40px] text-[30px] logo">{currentState} ─</h1>
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <>
              <div className="w-full h-[80px] xl:w-[60%] md:h-[90px] flex flex-col gap-2">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  placeholder="Joan"
                  required
                  className="w-full h-full border-2 border-[#8989ac] rounded-lg bg-[#454e6a] pl-2 text-1xl outline-none "
                />
              </div>
            </>
          )}

          <div className="w-full h-[80px] xl:w-[60%] md:h-[90px] flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Joan@email.com"
              required
              className="w-full h-full border-2 border-[#8989ac] rounded-lg bg-[#454e6a] pl-2 text-1xl outline-none "
            />
          </div>
          <div className="w-full h-[80px] xl:w-[60%] md:h-[90px] flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              required
              className="w-full h-full border-2 border-[#8989ac] rounded-lg bg-[#454e6a] pl-2 text-1xl outline-none"
            />
          </div>
          <div className="w-full xl:w-[60%] h-[50px] mt-6">
            {currentState === "Login" ? (
              <button className="w-full h-full rounded-lg bg-[#7339e5] font-bold text-[18px] tracking-widest">
                Login
              </button>
            ) : (
              <button className="w-full h-full rounded-lg bg-[#7339e5] font-bold text-[18px] tracking-widest">
                Sign up
              </button>
            )}
          </div>

          <div className="w-full xl:w-[60%] mt-5 flex gap-4  text-[gray] justify-center">
            ────────────── <span>Or</span>
            <span>──────────────</span>
          </div>

          <div className="text-center w-full xl:w-[60%]">
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className=" cursor-pointer"
              >
                <p className="text-[gray] tracking-wider">You have no account? <span className=" underline font-bold text-white">Create account</span></p>
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className=" cursor-pointer"
              >
                <p className="text-[gray] tracking-wider">Already have an account? <span className=" underline font-bold text-white">Log in</span></p>
              </p>
            )}
          </div>
        </form>

        {/* img */}
        <div className=" w-1/2 xl:flex hidden ">
            <img 
              src={img} 
              alt="" 
              className={`${currentState === "Login" ? "h-[120%]" : ''}`}
            />
        </div>
      </div>
    </div>
  );
};

export default Login;
