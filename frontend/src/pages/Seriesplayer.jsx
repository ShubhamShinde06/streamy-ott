import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import { IoAdd } from "react-icons/io5";
import {IoChevronBackOutline, IoInformationCircleOutline} from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { IoMdPlayCircle } from "react-icons/io";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { mixStore } from "../store/mixStore";
import { server } from "../App";
import { motion } from "framer-motion";
import { mylistStore } from "../store/mylistStore";
import { MdFileDownloadDone } from "react-icons/md";
import { useUserStore } from "../store/userStore";
import { toast } from "react-toastify";


const Seriesplayer = () => {
  const { id } = useParams();
  const itemId = id //global use

  const { user } = useUserStore();
  const userId = user?._id; //global use

  const { viewCount, visitCount } = mixStore();
  const { addToList, message  } = mylistStore();

 const [listId, setListId] = useState([])
  const [mylistUpdated, setMyListUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [category, setCategory] = useState('')

  const itemType = 'web_series'; //global use
  
  const topRef = useRef(null);
  const handlePageUp = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //single web series data
  const getSingleMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.get(server + `api/series/${id}`);
      if (response.data.success) {
        const Data = response.data.series;
        let characters = Data.characters;
        if (typeof characters === "string") {
          characters = characters.split(",").map((item) => item.trim());
        }

        const seasonData = Array.isArray(Data.seasons)
          ? Data.seasons
          : [Data.seasons];

        const DataM = {
          id: Data._id,
          image1: Data.image[0],
          image2: Data.image[1],
          title: Data.series_name,
          total_seasons: Data.total_seasons,
          release_year_start: Data.release_year_start,
          characters: characters,
          plot: Data.plot,
          rating: Data.rating,
          genre: Data.genre,
          video_link: Data.video_link,
          download_link: Data.download_link,
          seasonData: seasonData,
          likeCount: Data.likeCount,
          category: Data.category
        };

        setData(DataM)
        setSelectedSeason(seasonData.length > 0 ? seasonData[0] : null);
        setLoading(false);
        setCategory(DataM.category)
      }
    } catch (error) {
      console.error("Error fetching series:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSingleMovie();
  }, []);

  // count web page views
  useEffect(() => {
    viewCount(id);
  }, [id]);

   // add mylist
    const handleAddToList = async () => {
      try {
        await addToList(userId, itemId, itemType);
        setMyListUpdated((prev) => !prev)
        toast.success(message);
        console.log(message || "done");
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
          setListId(data.map(item => item.itemId._id)); // Logs all itemIds
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
  
    const isSaved = listId.includes(id);// global use
  

  return (
    <>
      <div className="w-full h-[calc(100vh-auto)] lg:h-[100vh] lg:flex">
        <Sidebar />
        {loading ? (
          <>
            <motion.div className="relative w-full h-[70vh] md:h-[75vh] lg:h-screen xl:h-[90vh] bg-gray-800  overflow-hidden shadow-lg cursor-pointer animate-pulse">
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
            <div className="lg:relative w-full h-full overflow-scroll show-scroll">
              <main className="w-full h-auto lg:h-[100%]">
                <div className="in-site-color w-full h-full relative lg:block flex flex-col items-center justify-center">
                  <header className="absolute top-5 left-2 lg:top-10 lg:left-10 z-20">
                    <button
                      onClick={() => navigate("/home")}
                      className="px-2 py-2 rounded-full lg:border-2 border-[#8989ac] backdrop-blur-sm lg:bg-white/20 text-2xl"
                    >
                      <IoChevronBackOutline />
                    </button>
                  </header>

                  <div className="h-auto w-[100%] rounded-md overflow-hidden lg:w-full lg:h-[95%]">
                    <div className="lg:relative h-[70vh] lg:h-[100vh]">
                      <img
                        className="w-full h-full lg:hidden"
                        src={data?.image1}
                        alt="poster"
                      />
                      <img
                        className="w-full h-full lg:block hidden"
                        src={data?.image2}
                        alt="poster"
                      />
                      <div className="absolute w-full h-[70vh] z-10 in-site-color top-0 left-0 lg:w-full lg:h-full flex flex-col justify-end items-center lg:items-start gap-6 lg:px-[50px] lg:py-[100px]">
                        <h1 className="lg:text-6xl lg:py-5 font-bold text-3xl">
                          {data?.title}
                        </h1>
                        <div className="flex flex-col gap-6 w-full py-4 lg:py-0 lg:w-auto">
                          <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-4">
                            <Link
                              to="#"
                              onClick={handlePageUp}
                              className="bg-white text-black px-10 py-2 lg:py-3 lg:px-16 text-xl rounded-md flex items-center gap-3"
                            >
                              <FaPlay /> Play
                            </Link>
                            <button className="bg-white/40 px-6 py-2 lg:py-3 lg:px-10 text-xl rounded-md flex items-center gap-1">
                              <LuDownload className="text-2xl" /> Download
                            </button>
                            <div className="flex items-center gap-4">
                              <button className="px-2 py-2 rounded-full border-2 border-[#8989ac] backdrop-blur-sm bg-white/20 text-2xl">
                                  {isSaved ? <MdFileDownloadDone /> : <IoAdd onClick={handleAddToList}/>}
                              </button>
                              {/* <div className="flex flex-col gap-2 items-center justify-center mt-8">
                            <button
                              onClick={handleLike}
                              className={`px-2 py-2 rounded-full border-2 border-[#8989ac] backdrop-blur-sm bg-white/20 text-2xl`}
                            >
                              {liked ? <AiFillLike /> : <BiLike />}
                            </button>
                            <span>{likeCount}</span>
                          </div> */}
                              <button className="px-2 py-2 rounded-full border-2 border-[#8989ac] backdrop-blur-sm bg-white/20 text-2xl">
                                <IoInformationCircleOutline />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <div className="slider-container w-full mx-auto h-auto flex flex-col gap-10 bg-[#070140] px-5 py-5 lg:py-10 lg:px-12">
                <div className="w-full flex flex-col gap-8">
                  <div className=" flex flex-col lg:flex-row  lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4 text-[#8989ac]">
                      <b className="text-white text-xl">Popular</b>{" "}
                      <p>IMDB {data?.rating}</p>
                      <p>{data?.release_year_start}</p>
                      <p className="text-[18px]">
                        {data?.total_seasons} seasons
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-white text-xl mt-5 lg:mt-0">
                      <b className=" text-[#8989ac]">Genres:</b>
                      {Array.isArray(data?.genre) && data.genre.length > 0
                        ? data.genre.flat().join(" • ")
                        : "No genres available"}
                    </div>
                  </div>
                  <div className=" flex flex-col lg:flex-row items-start justify-between">
                    <b className="flex gap-2 tracking-wide text-[20px] text-[#8989ac] lg:w-[60%] ">
                      <p className="text-white">Plot: </p>{" "}
                      <span className="text-wrap line-clamp-3">
                        {data?.plot}
                      </span>
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
                  <div className="container mx-auto p-0 flex items-center justify-between">
                    <h1 className="text-3xl">Episodes</h1>
                    <select
                      ref={topRef}
                      className="bg-white/30 backdrop-blur-md border border-[#8989ac] text-xl rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 px-4 py-2 hover:bg-white/50"
                      onChange={(e) => {
                        const season = data?.seasonData.find(
                          (s) => s.season_number === Number(e.target.value)
                        );
                        if (season) setSelectedSeason(season);
                      }}
                    >
                      {data?.seasonData.map((season) => (
                        <option key={season.season_number} value={season.season_number}>
                          Season {season.season_number}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedSeason?.episodes?.length > 0 ? (
                    selectedSeason.episodes.map((episode) => (
                      <>
                        <div
                          key={episode.id}
                          className="hover:bg-[#7a7a937c]  hover:rounded-md flex justify-between items-center py-5 lg:py-10 px-2 lg:px-10 lg:gap-10 gap-4 border-b-2 border-[#8989ac] hover-box w-full"
                        >
                          <div className=" lg:h-[200px] h-[100px] rounded-md overflow-hidden relative flex items-center gap-6">
                            <div className="lg:min-w-[250px] max-w-[100px]">
                              <Link to={`/iframeS/${data.id}/${episode._id}`}>
                                <img
                                  className="w-full h-full lg:hidden object-fill"
                                  src={data?.image1}
                                  alt="poster"
                                />
                              </Link>
                              <img
                                className="w-full h-full lg:block hidden object-fill"
                                src={data?.image2}
                                alt="poster"
                              />
                              <Link
                                to={`/iframeS/${data.id}/${episode._id}`}
                                className="opacity-0 absolute lg:top-7 top-0 w-[80px] hidden  lg:w-[250px] h-[100px] lg:h-[140px] lg:flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box"
                              >
                                <IoMdPlayCircle className="cursor-pointer" />
                              </Link>
                            </div>
                            <div className="flex flex-col gap-3">
                              <div>
                                <h1 className="lg:text-2xl mb-1 text-xl line-clamp-1">
                                  {episode.title}
                                </h1>
                                <p className="text-[#8989ac] text-xs">
                                  {episode.runtime_minutes}
                                </p>
                              </div>
                              <p className="lg:text-[20px] text-[15px] lg:w-1/2 text-[#cdcddf] text-wrap line-clamp-2">
                                {episode.plot}
                              </p>
                            </div>
                          </div>
                          <button className="lg:text-4xl text-xl text-start">
                            <LuDownload />
                          </button>
                        </div>
                      </>
                    ))
                  ) : (
                    <p className="text-[#8989ac]">No episodes available</p>
                  )}

                  <div>
                    <h1 className="text-3xl ">Cast</h1>
                    <div className=" w-full flex items-center justify-center lg:justify-start flex-wrap gap-8 mt-5">
                      {data?.characters && data?.characters.length > 0 ? (
                        data?.characters.map((item, index) => (
                          <div
                            key={index}
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
    </>
  );
};

export default Seriesplayer;
