import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/LoginImg.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../store/userStore";

const PasswordSet = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useUserStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password Do Not Match");
    }
    await resetPassword(token, password);
    navigate("/auth");
    toast.success("Password reset successfully");
  };

  return (
    <div className="bg-color h-[calc(100vh)] text-white px-5 py-5 md:px-[100px] md:py-10 lg:px-[150px] lg:py-[50px]">
      {/* HEADER */}
      <div className="">
        <Link to={"/"}>
          <h1 className="text-4xl font-bold logo">STREAMY</h1>
        </Link>
      </div>

      <div className="w-full mt-8 md:mt-[80px] flex justify-between ">
        {/* form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <div className=" text-white w-[100%] flex flex-col items-center justify-center px-2 lg:px-10 py-8 lg:py-0">
            <div className="w-full  rounded-lg ">
              <div className="p-6 space-y-4 md:space-y-6">
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-white pb-6 lg:pb-3">
                  Reset Password
                </h1>
                {error && (
                  <p className=" text-red-500 font-semibold mt-2">{error}</p>
                )}
                {message && (
                  <p className=" text-green-500 font-semibold mt-2">
                    {message}
                  </p>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-xl font-medium text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="passwordone"
                      placeholder="••••••••"
                      className=" lg:py-5 bg-[#454e6a] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-xl font-medium text-white"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="passwordtwo"
                      placeholder="••••••••"
                      className=" lg:py-5 bg-[#454e6a] rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required=""
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#7339e5] w-full cursor-pointer rounded-2xl  text-xl text-white py-4 hover:scale-105 duration-300 flex items-center justify-center"
                  >
                    {isLoading ? "Resetting.." : "Set New Password"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* img */}
        <div className=" w-1/2 h-full xl:flex hidden justify-end">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default PasswordSet;
