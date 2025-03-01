import React, { useState } from 'react'
import img from "../assets/LoginImg.png";
import {Link} from 'react-router-dom'
import { GoEyeClosed } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import axios from 'axios'
import {server} from '../App'
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Auth = ({setToken}) => {

      const [show, setShow] = useState(false);
      const [loading, setLoading] = useState(false)

      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        const response = await axios.post(server + '/api/auth/admin-login', {email, password})
        if(response.data.success){
          setToken(response.data.token)
          setLoading(false)
        }else {
                toast.error(response.data.message);
                setLoading(false)
              }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        setLoading(false)
      }
    }

  return (
    <div className="bg-color h-[calc(100vh)] text-white px-5 py-5 md:px-[100px] md:py-10 lg:px-[150px] lg:py-[50px]">
      {/* HEADER */}
      <div className="">
        <Link to={"/"}>
          <h1 className="text-4xl font-bold logo">STREAMY</h1>
        </Link>
      </div>

      <div className="w-full mt-8 md:mt-[80px] gap-1 flex md:gap-2 ">
        {/* login & register */}
        <form
          onSubmit={handleSubmit}
          className=" w-full h-[80vh] md:h-full justify-center flex flex-col gap-4 md:gap-6"
        >
          <div className="w-full mb-4 text-center md:text-start">
            <h1 className="md:text-[40px] text-[30px] logo">
              {'Admin Login'} ─
            </h1>
          </div>
     
 
    

          <div className="w-full h-[80px] xl:w-[60%] md:h-[90px] flex flex-col gap-2 text-xl">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Joan@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-full border-2 border-[#8989ac] rounded-lg bg-[#454e6a] pl-2 text-1xl outline-none "
            />
          </div>

          <div className="w-full h-[80px] xl:w-[60%] md:h-[90px] flex flex-col gap-2 text-xl">
            <label htmlFor="">Password</label>
            <div className="w-full h-full bg-[#454e6a] flex relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-[#8989ac] rounded-lg bg-transparent pl-2 py-2 text-1xl outline-none flex-1"
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                {show ? (
                  <IoEyeOutline onClick={() => setShow(false)} />
                ) : (
                  <GoEyeClosed onClick={() => setShow(true)} />
                )}
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[60%] h-[50px] mt-10 md:mt-4">
          
              <button className="w-full h-full rounded-lg bg-[#7339e5] font-bold text-[18px] tracking-widest flex items-center justify-center">
                {loading ? <Loader /> : "Login"}
               
              </button>
          
          </div>

          {/* <div className="w-full xl:w-[60%] mt-5 flex gap-4  text-[gray] justify-center">
            ────────────── <span>Or</span>
            <span>──────────────</span>
          </div> */}

          {/* <div className="text-center w-full xl:w-[60%]">
            {currentState === "Login" ? (
              <div
                onClick={() => setCurrentState("Sign Up")}
                className=" cursor-pointer"
              >
                <p className="text-[gray] tracking-wider">
                  You have no account?{" "}
                  <span className=" underline font-bold text-white tracking-wide text-[18px]">
                    Create account
                  </span>
                </p>
              </div>
            ) : (
              <div
                onClick={() => setCurrentState("Login")}
                className=" cursor-pointer"
              >
                <p className="text-[gray] tracking-wider">
                  Already have an account?{" "}
                  <span className=" underline font-bold text-white tracking-wide text-[18px]">
                    Log in
                  </span>
                </p>
              </div>
            )}
          </div> */}
        </form>

        {/* img */}
        <div className=" w-1/2 h-full xl:flex hidden justify-end items-center">
          <img
            src={img}
            alt=""
            //className={`${currentState === "Login" ? "h-[120%]" : ""}`}
          />
        </div>
      </div>
    </div>
  )
}

export default Auth