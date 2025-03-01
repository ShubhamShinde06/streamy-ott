import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import { IoAdd, IoPlayCircle } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import {
  IoChevronBackOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { IoMdPlayCircle } from "react-icons/io";
import axios from "axios";
import { CgProfile } from "react-icons/cg";

const Seriesplayer = () => {
  const { id } = useParams();

  const navigation = useNavigate();

  const [data, setData] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState([]);

  const getSingleMovie = async () => {
    try {
      const response = await axios.get(`/api/series/get-single-series/${id}`);
      if (response.data.success) {
        const Data = response.data.series;
        let characters = Data.characters;
        if (typeof characters === "string") {
          characters = characters.split(",").map((item) => item.trim()); // Split and trim string if necessary
        }
        const DataM = {
          id: Data._id,
          image1: Data.image[0],
          image2: Data.image[1],
          total_seasons: Data.total_seasons,
          release_year_start: Data.release_year_start,
          characters: characters,
          plot: Data.plot,
          rating: Data.rating,
          genre: Data.genre,
          video_link: Data.video_link,
          download_link: Data.download_link,
          seasonData: [Data.seasons],
        };
        setData(DataM);
        setSelectedSeason(DataM.seasonData);
      } else {
        //toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error(error.message);
    }
  };
  useEffect(() => {
    getSingleMovie();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-80px)] lg:h-[100vh] lg:flex">
      <Sidebar />
      <div className=" lg:relative w-full h-full overflow-scroll show-scroll">
        {/* poster */}
        <main className="w-full h-auto lg:h-[100%] ">
          <div className=" in-site-color w-full h-full relative lg:block flex flex-col items-center justify-center">
            {/* logo */}
            <header className="absolute top-5 left-2 lg:top-10 lg:left-10 z-20 ">
              <button className="px-2 py-2 rounded-full lg:border-2 border-[#8989ac] backdrop-blur-sm lg:bg-white/20 text-2xl">
                <IoChevronBackOutline />
              </button>
            </header>
            <div className="h-auto w-[100%] rounded-md overflow-hidden lg:overflow-visible lg:w-full lg:h-[95%] lg:rounded-none ">
              {/* image & btns */}
              <div className=" lg:relative h-[70vh] lg:h-[100vh] ">
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
                  <div className="flex flex-col gap-6 w-full py-4 lg:py-0 lg:w-auto">
                    <div className="  flex-col items-center gap-3 flex lg:flex-row lg:items-center lg:justify-evenly w-full lg:gap-4 ">
                      <Link
                        to={"/seriesplayer/:id"}
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
                        <button className="px-2 py-2 rounded-full border-2 border-[#8989ac] backdrop-blur-sm bg-white/20 text-2xl">
                          <IoAdd />
                        </button>
                        <button className="px-2 py-2 rounded-full border-2 border-[#8989ac] backdrop-blur-sm bg-white/20 text-2xl">
                          <BiLike />
                        </button>
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
        {/* categorys */}
        <div className="slider-container w-full mx-auto h-auto flex flex-col gap-10 bg-[#070140] px-5 py-5 lg:py-10 lg:px-12">
          <div className="w-full flex flex-col gap-8">
            <div className=" flex flex-col lg:flex-row  lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-4 text-[#8989ac]">
                  <b className="text-white text-xl">Popular</b>{" "}
                  <p>IMDB {data.rating}</p>
                  <p>{data.release_year_start}</p>
                  <p className="text-[18px]">{data.total_seasons} seasons</p>
                </div>
                {/* <p className=" text-xl text-center lg:text-start text-[#8989ac] mt-2">
                  <span>Comdey</span>&#x2022;<span> Action </span>&#x2022;
                  <span> Horror</span>
                </p> */}
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
              <div className="flex items-center gap-2 text-white text-xl mt-5 lg:mt-0">
                <b className=" text-[#8989ac]">This Series is:</b>
                <p>Streamy Platfrom</p>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-6 lg:gap-8">
            <div className="container mx-auto p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">Episodes</h1>
                <select
                  className="bg-transparent backdrop-blur-sm lg:bg-white/20 px-8 py-2 border-2 text-xl border-[#8989ac] rounded-md"
                  onChange={(e) => {
                    const season = data.seasonData.find(
                      (s) => s.season_number === Number(e.target.value),
                    );
                    setSelectedSeason(season);
                  }}
                >
                  {data.seasonData.map((season) => (
                    <option key={season._id} value={season.season_number}>
                      Season {season.season_number}
                    </option>
                  ))}
                </select>
              </div>

              {selectedSeason.episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="hover:bg-[#7a7a937c] hover:rounded-md flex justify-between items-center py-10 px-2 lg:px-20 lg:gap-10 gap-4 border-b-2 border-[#8989ac] hover-box"
                >
                  <h1 className="hidden lg:block text-2xl">{episode.id}</h1>
                  <div className="lg:min-w-[340px] lg:h-[200px] min-w-[100px] h-[100px] rounded-md overflow-hidden relative">
                    <img
                      src="https://i.ebayimg.com/images/g/4NQAAOSwyTpjk7dC/s-l1200.jpg"
                      alt="episode_img"
                      className="w-full h-full"
                    />
                    <div className="opacity-0 absolute top-0 w-[100%] h-full flex justify-center items-center text-5xl backdrop-blur-sm bg-white/5 show-box">
                      <IoMdPlayCircle className="cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h1 className="lg:text-2xl mb-1 text-xl">
                        {episode.title}
                      </h1>
                      <p className="text-[#8989ac] text-xs">
                        {episode.duration}
                      </p>
                    </div>
                    <p className="lg:text-[20px] text-[15px] text-[#cdcddf] text-wrap line-clamp-2">
                      {episode.description}
                    </p>
                  </div>
                  <button className="lg:text-4xl text-xl text-start">
                    <LuDownload />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <h1 className="text-3xl ">Cast</h1>
              <div className=" w-full flex items-center justify-center lg:justify-start flex-wrap gap-8 mt-5">
                {data.characters && data.characters.length > 0 ? (
                  data.characters.map((item, index) => (
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

            <div className="mt-10">
              <h1 className="text-2xl ">More Like This</h1>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-5 lg:px-10">
                <div className="w-auto h-[500px]  overflow-hidden">
                  <div className="w-full h-1/2 ">
                    <img
                      className="w-full h-full"
                      src="https://i.ebayimg.com/images/g/4NQAAOSwyTpjk7dC/s-l1200.jpg"
                      alt=""
                    />
                  </div>
                  <div className="h-full bg-[#7a7a933f] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className=" text-2xl">13 Reason why</p>
                        <p className="text-[#8989ac]">1 Seasons</p>
                      </div>
                      <div className=" text-5xl">
                        <IoPlayCircle />
                      </div>
                    </div>
                    <div className=" text-[#8989ac] mt-8 tracking-wide line-clamp-4 lg:line-clamp-none">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Provident ea accusantium iste nostrum totam ab nemo
                        labore incidunt, qui, voluptate animi quisquam quidem
                        sequi facilis quaerat aperiam, recusandae dolor ullam.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-auto h-[500px] border"></div>
                <div className="w-auto h-[500px] border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seriesplayer;
