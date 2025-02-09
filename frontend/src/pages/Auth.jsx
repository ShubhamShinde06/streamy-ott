import React, { useState } from "react";
import img from "../assets/LoginImg.png";
import { Link, useNavigate } from "react-router-dom";
import { GoEyeClosed } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { useUserStore } from "../store/userStore";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const Auth = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [show, setShow] = useState(false);
  const { login, signup, error, isLoading, message } = useUserStore();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentState === "Login") {
      try {
        await login(email, password);

        navigate("/");

        toast.success(message || "Welcome back");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await signup(name, email, password);
        toast.success(message);
        navigate("/verify-email");
      } catch (error) {
        console.log(error);
      }
    }
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
        {/* login & register */}
        <form
          onSubmit={handleSubmit}
          className=" w-full h-[80vh] md:h-full justify-center flex flex-col gap-4 md:gap-6 xl:w-1/2"
        >
          <div className="w-full xl:w-[60%] mb-4 text-center md:text-start">
            <h1 className="md:text-[40px] text-[30px] logo">
              {currentState} ─
            </h1>
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <>
              <div className="w-full h-[80px] xl:w-[60%] md:h-[90px] flex flex-col gap-2 text-xl">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  placeholder="Joan"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-full border-2 border-[#8989ac] rounded-lg bg-[#454e6a] pl-2 text-1xl outline-none "
                />
              </div>
            </>
          )}

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
            {currentState === "Login" ? (
              <>
                <div className=" text-[16px] text-end">
                  <Link to={"/forgot-password"}>
                    <h1 className=" cursor-pointer">Forgot password</h1>
                  </Link>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          {error && <p className=" text-red-500 font-semibold mt-2">{error}</p>}
          <div className="w-full xl:w-[60%] h-[50px] mt-10 md:mt-4">
            {currentState === "Login" ? (
              <button className="w-full h-full rounded-lg bg-[#7339e5] font-bold text-[18px] tracking-widest flex items-center justify-center">
                {isLoading ? <Loading /> : "Login"}
              </button>
            ) : (
              <button className="w-full h-full rounded-lg bg-[#7339e5] font-bold text-[18px] tracking-widest  flex items-center justify-center">
                {isLoading ? <Loading /> : "Sign up"}
              </button>
            )}
          </div>

          <div className="w-full xl:w-[60%] mt-5 flex gap-4  text-[gray] justify-center">
            ────────────── <span>Or</span>
            <span>──────────────</span>
          </div>

          <div className="text-center w-full xl:w-[60%]">
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
          </div>
        </form>

        {/* img */}
        <div className=" w-1/2 xl:flex hidden ">
          <img
            src={img}
            alt=""
            className={`${currentState === "Login" ? "h-[120%]" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
