import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/LoginImg.png";
import { IoIosArrowBack, IoMdArrowBack } from "react-icons/io";
import Loading from "../components/Loading";
import { useUserStore } from "../store/userStore";

const EmailSendFrongotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };
  return (
    <div className="bg-color h-[calc(100vh)] text-white px-5 py-5 md:px-[100px] md:py-10 lg:px-[150px] lg:py-[50px]">
      {/* HEADER */}
      <div className="">
        <Link to={"/"}>
          <h1 className="text-4xl font-bold logo">STREAMY</h1>
        </Link>
      </div>

      <div className="w-full mt-8 md:mt-[80px] gap-1 flex md:gap-2 ">
        {/* form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center lg:px-10">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl flex items-center justify-center font-bold leading-tight tracking-tight text-white">
            Forgot Pasword
          </h1>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <p className="text-white mb-6 text-center text-xl">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" lg:py-5 bg-[#454e6a] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Email"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-[#7339e5] w-full cursor-pointer rounded-2xl  text-xl text-white py-4 hover:scale-105 duration-300 flex items-center justify-center"
              >
                 {isLoading ? <Loading/> : "Send Reset Link"}
              </button>
              <p className=" font-light text-black flex items-center justify-center text-xl">
                <Link
                  to="/"
                  className=" flex items-center gap-1 text-white font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  <IoIosArrowBack className="text-xl" /> Back to Login
                </Link>
              </p>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                If an account exists for <span className=" font-bold">{email}</span>, you will receive a password
                reset link shortly.
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <Link
                  to="/"
                  className=" flex items-center gap-1 text-white font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  <IoMdArrowBack className="text-xl" /> Back to Login
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

        {/* img */}
        <div className=" w-1/2 xl:flex hidden ">
          <img src={img} alt="img" className={"h-[120%]"} />
        </div>
      </div>
    </div>
  );
};

export default EmailSendFrongotPassword;
