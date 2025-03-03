import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useUserStore } from "../store/userStore";
import img from "../assets/upload_area.png";
import { FaRegUser } from "react-icons/fa";

const Profile = () => {
  const [change, setChange] = useState("Profile");
  const { user, checkAuth } = useUserStore();
  const [image, setImage] = useState(false);

  const [updated, setUpdate] = useState(false);

  const { logout } = useUserStore();

  const handleLogout = () => {
    logout();
  };

  const imageURL =
    image && image instanceof File ? URL.createObjectURL(image) : image;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="w-full h-[calc(100vh-auto)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className="w-full h-full lg:flex py-10 px-5 hidden justify-center items-center">
        <div className="lg:w-1/3 h-full flex flex-col gap-5 px-5">
          {[
            "Profile",
            "Support",
            "Privacy Policy",
          ].map((item) => (
            <div
              key={item}
              onClick={() => setChange(item)}
              className={`py-3 w-full rounded-md px-2 text-xl cursor-pointer transition-all ${
                change === item
                  ? "backdrop-blur-sm bg-white/15 text-white font-semibold"
                  : "text-gray-300"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 h-full backdrop-blur-sm bg-white/15 rounded-md py-8 px-5">
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-3">
              <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center object-center">
                {/* <label htmlFor="image">
                  <img
                    className="w-full h-full cursor-pointer object-cover"
                    src={imageURL || img}
                    alt="upload"
                  />
                  <input
                    type="file"
                    id="image"
                    name="image"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label> */}
                <FaRegUser className="text-7xl" />
              </div>
              <div className="flex flex-col justify-center">
                <p>{user?.name}</p>
                <p className=" text-gray-400">0.02.16</p>
              </div>
            </div>
          </div>

          <div className=" mt-20 border-2 rounded-md py-6 px-5  border-[#8989ac] outline-none">
            <h1 className="text-xl font-normal tracking-wider">
              Personal information
            </h1>
            <div className="flex justify-center gap-5 mt-5">
              <div className="w-full">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="py-3 px-2 w-full mt-1 placeholder:text-white rounded-md backdrop-blur-sm bg-white/15 border-2 border-[#8989ac] outline-none"
                  placeholder={user?.name}
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="py-3 px-2 w-full mt-1 placeholder:text-white rounded-md backdrop-blur-sm bg-white/15 border-2 border-[#8989ac] outline-none"
                  placeholder={user?.email}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className=" mt-10  rounded-md py-6 px-5 outline-none">
            <div className="flex justify-end gap-4">
              {updated ? (
                <>
                  <button
                    onClick={() => setUpdate(false)}
                    className="px-6 py-4 rounded-md backdrop-blur-sm bg-white/15 font-bold tracking-wider"
                  >
                    Cancel
                  </button>
                  <button className="px-6 py-4 rounded-md bg-[#7339e5]">
                    Update
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setUpdate(true)}
                  className="px-6 py-4 rounded-md bg-[#7339e5]"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
        {/* <h1>Comeing Soon...</h1> */}
      </div>

      <div className="px-5 py-5 w-full h-full flex justify-center items-center lg:hidden">
        <div className="mt-10 w-full">
          <div className=" flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center object-center">
              {/* <label htmlFor="image">
                <img
                  className="w-full h-full cursor-pointer object-cover"
                  src={imageURL || img}
                  alt="upload"
                />
                <input
                  type="file"
                  id="image"
                  name="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label> */}
              <FaRegUser className="text-7xl" />
            </div>
            <p className="mt-1 text-xl">{user?.name}</p>
            <p className="text-xs">0.02.16</p>
          </div>

          <div className="w-full h-full flex flex-col gap-3 mt-5">
            {[
              "Profile",
              "Support",
              "Privacy Policy",
            ].map((item) => (
              <div
                key={item}
                onClick={() => setChange(item)}
                className={`py-2 w-full rounded-md px-2 text-xl cursor-pointer transition-all ${
                  change === item
                    ? "backdrop-blur-sm bg-white/15 text-white font-semibold"
                    : "text-gray-300"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={handleLogout}
            className=" py-2 w-full  backdrop-blur-sm bg-white/15 rounded-md mt-28 text-xl"
          >
            Log Out
          </button>
        </div>
        {/* <h1>Comeing Soon...</h1> */}
      </div>
    </div>
  );
};

export default Profile;
