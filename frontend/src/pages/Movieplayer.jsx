import { IoAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import {
  IoChevronBackOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { mixStore } from "../store/mixStore";
import { server } from "../App";
import { motion } from "framer-motion";
import { mylistStore } from "../store/mylistStore";
import { useUserStore } from "../store/userStore";
import { MdFileDownloadDone } from "react-icons/md";
import Loading from "../components/Loading";
import Report from "../components/Report";

const Movieplayer = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const itemId = id; //global use

  const { user } = useUserStore();
  const userId = user?._id; //global use

  const navigation = useNavigate();
  const [reportShow, setReportShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listId, setListId] = useState([]);
  const [mylistUpdated, setMyListUpdated] = useState(false);
  const { addToList, deleteToList, message, error, isLoading } = mylistStore();
  const { viewCount, visitCount } = mixStore();
  const [category, setCategory] = useState("");
  const [saveId, setSaveId] = useState(null);

  const itemType = category; //global use

  //single movie get
  const getSingleMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        server + `api/movies/get-single-movies/${id}`,
      );
      if (response.data.success) {
        const Data = response.data.movie;
        let characters = Data.characters;
        if (typeof characters === "string") {
          characters = characters.split(",").map((item) => item.trim()); // Split and trim string if necessary
        }
        const DataM = {
          title: Data.title,
          id: Data._id,
          image1: Data.image[0],
          image2: Data.image[1],
          characters: characters,
          plot: Data.plot,
          rating: Data.rating,
          genre: Data.genre,
          video_link: Data.video_link,
          download_link: Data.download_link,
          likeCount: Data.likeCount,
          category: Data.category,
        };
        setData(DataM);
        setLoading(false);
        setCategory(DataM.category);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSingleMovie();
  }, []);

  //page view counts
  useEffect(() => {
    viewCount(id);
  }, [id]);

  // add mylist
  const handleAddToList = async () => {
    try {
      await addToList(userId, itemId, itemType);
      setMyListUpdated((prev) => !prev);
      //toast.success(message);
      //console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}api/mylist/get/${userId}`);
        const data = response.data.data;
        if (data.length > 0) {
          setListId(data.map((item) => item.itemId._id));
          setSaveId(data.find((item) => item.itemId._id === id)?._id || "");
        } else {
          console.log("No items found");
        }
      } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId, mylistUpdated]);

  const isSaved = listId.includes(id); // global use

  // remove mylist
  const handleDeleteToList = async () => {
    try {
      await deleteToList(userId, saveId);
      setMyListUpdated((prev) => !prev);
      //toast.success(message);
      //console.log(message || error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-auto)] lg:h-[100vh] lg:flex">
      <Sidebar />
      {loading ? (
        <>
          <motion.div className="relative h-[70vh] md:h-[75vh] lg:h-screen xl:h-[90vh] bg-gray-800  overflow-hidden shadow-lg cursor-pointer animate-pulse">
            <div className="absolute inset-0 in-site-color flex flex-col justify-end items-center gap-3 lg:gap-6 lg:items-start p-6 lg:p-14 xl:p-20">
              <p className="text-white bg-gray-700 text-lg md:text-xl lg:text-2xl xl:text-3xl w-4/5 hidden lg:block truncate-multiline"></p>
              <p className="text-white bg-gray-700 text-xl md:text-lg lg:text-xl xl:text-2xl line-clamp-1"></p>
              <div className="flex gap-4 mt-4">
                <button className="bg-gray-700 text-black px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2"></button>
                <button className="bg-gray-700 text-white px-6 md:px-10 py-2 md:py-3 text-lg lg:text-xl xl:text-2xl rounded-md flex items-center gap-2"></button>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <div className=" lg:relative w-full h-full overflow-scroll show-scroll">
            {/* poster */}
            <main className="w-full h-auto lg:h-[100%] ">
              <div className=" in-site-color w-full h-full relative lg:block flex flex-col items-center justify-center">
                {/* logo */}
                <header className="absolute top-5 left-2 lg:top-10 lg:left-10 z-20 ">
                  <button
                    onClick={() => navigation("/home")}
                    className="px-2 py-2 rounded-full lg:border-2 border-[#8989ac] backdrop-blur-sm lg:bg-white/20 text-2xl"
                  >
                    <IoChevronBackOutline />
                  </button>
                </header>
                <div className="h-auto w-[100%] rounded-md overflow-hidden lg:overflow-visible lg:w-full lg:h-[95%] lg:rounded-none ">
                  {/* image & btns */}
                  <div className=" lg:relative h-[70vh] lg:h-[100vh]">
                    <img
                      className="w-full h-full -z-10 lg:hidden"
                      src={data.image1}
                      alt="poster"
                    />
                    <img
                      className="w-full h-full -z-10 lg:block hidden"
                      src={data.image2}
                      alt="poster"
                    />

                    {/* content */}
                    <div className=" absolute w-[100%] h-[70vh] z-10 in-site-color top-0 left-0 lg:w-full lg:h-full flex flex-col justify-end items-center lg:items-start gap-6 lg:px-[50px] lg:py-[100px] tracking-widest">
                      <h1 className="lg:text-6xl lg:py-5 font-bold text-3xl">
                        {data.title}
                      </h1>
                      <div className="flex flex-col gap-6 w-full py-4 lg:py-0 lg:w-auto">
                        <div className="  flex-col items-center gap-3 flex lg:flex-row lg:items-center lg:justify-evenly w-full lg:gap-4 ">
                          <Link
                            to={`/iframeM/${data.id}`}
                            className="backdrop-blur-sm bg-white text-black px-10 py-2 lg:py-3 lg:px-16 text-xl rounded-md flex items-center gap-3"
                          >
                            <FaPlay /> Play
                          </Link>
                          <Link
                            to={""}
                            className="backdrop-blur-sm bg-white/40 px-6 py-2 lg:py-3 lg:px-10  text-xl rounded-md flex items-center gap-1"
                          >
                            <LuDownload className=" text-2xl" />
                            Download
                          </Link>
                          <div className="flex items-center gap-4">
                            <button
                              className="px-2 py-2 rounded-full border-2  text-2xl border-[#8989ac] backdrop-blur-sm bg-white/20"
                              onClick={() => {
                                if (!user) {
                                  navigate("/auth"); // Redirect to auth if user is null
                                } else {
                                  isSaved
                                    ? handleDeleteToList()
                                    : handleAddToList();
                                }
                              }}
                            >
                              {isLoading ? (
                                <Loading />
                              ) : isSaved ? (
                                <MdFileDownloadDone />
                              ) : (
                                <IoAdd />
                              )}
                            </button>

                            {reportShow ? (
                              <Report
                                setReportShow={setReportShow}
                                itemId={itemId}
                                userId={userId}
                                itemType={itemType}
                              />
                            ) : (
                              <button
                                className="px-2 py-2 rounded-full border-2 border-[#8989ac] backdrop-blur-sm bg-white/20 text-2xl"
                                onClick={() =>
                                  user ? setReportShow(true) : navigate("/auth")
                                }
                              >
                                <IoInformationCircleOutline />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            {/* categorys */}
            <div className="slider-container w-full mx-auto h-auto flex flex-col gap-10 bg-[#070140] px-5 py-5 lg:py-10 lg:px-12">
              <div className="w-full flex flex-col gap-8">
                <div className=" flex flex-col lg:flex-row  lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4 text-[#8989ac]">
                    <b className="text-white text-xl">Popular</b>{" "}
                    <p>{data.rating}</p>
                    <p className="text-[20px]">2018</p>
                    <p className="text-[20px]">{data.name}</p>
                  </div>

                  <div className="flex items-center gap-2 text-white text-xl mt-5 lg:mt-0">
                    <b className=" text-[#8989ac]">Genres:</b>
                    {Array.isArray(data.genre) && data.genre.length > 0
                      ? data.genre.flat().join(" • ")
                      : "No genres available"}
                  </div>
                </div>
                <div className=" flex flex-col lg:flex-row items-start justify-between">
                  <b className="flex gap-2 tracking-wide text-[20px] text-[#8989ac] lg:w-[60%]">
                    <p className="text-white">Plot: </p>{" "}
                    <span className="text-wrap line-clamp-3">{data.plot}</span>
                  </b>
                  <div className=" flex flex-col gap-5">
                    <div className="flex items-center gap-2 text-white text-xl mt-5 lg:mt-0">
                      <b className=" text-[#8989ac]">This Series is:</b>
                      <p>Streamy Platfrom</p>
                    </div>
                    <div className="flex items-center gap-2 text-white text-xl mt-5 lg:mt-0">
                      <b className=" text-[#8989ac]">Views:</b>
                      <p>{visitCount}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-6 lg:gap-8">
                <div>
                  <h1 className="text-3xl ">Cast</h1>
                  <div className=" w-full flex items-center justify-center lg:justify-start flex-wrap gap-8 mt-5">
                    {data.characters && data.characters.length > 0 ? (
                      data.characters.map((item, index) => (
                        <div
                          key={index + 1}
                          className="flex flex-col gap-2 items-center text-center"
                        >
                          <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center text-9xl">
                            <CgProfile />
                          </div>
                          <p>{item}</p> {/* Display the character name */}
                        </div>
                      ))
                    ) : (
                      <p>No characters available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Movieplayer;
