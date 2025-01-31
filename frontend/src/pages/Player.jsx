import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TbArrowBackUp } from "react-icons/tb";

const Player = () => {
  const { id } = useParams();

  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSingleMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/movies/get-single-movies/${id}`);
      if (response.data.success) {
        const Data = response.data.movie;
        const DataM = {
          id: Data._id,
          title: Data.title,
          iframe: Data.video_link,
          download_link: Data.download_link,
        };
        setData(DataM);
        setLoading(false);
      } else {
        toast.error(response.data.message);
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

  return (
    <div className="w-full h-[100vh] bg-black px-2 py-5 flex flex-col gap-6">
      <div className=" w-full flex items-center justify-between">
        <div className=" flex items-center gap-3">
          <TbArrowBackUp
            onClick={() => navigation(`/movieplayer/${data.id}`)}
            className=" px-2 py-2 border rounded-full mr-1 lg:mr-5 text-4xl lg:text-5xl cursor-pointer"
          />
          <div>
            <h1 className=" hidden lg:block  lg:text-3xl ">
              <span className=" font-bold tracking-wide">Watching Now:</span> {data.title}
            </h1>
          </div>
        </div>
        <div>
          <Link to={"/"}>
            <h1 className="text-2xl lg:text-4xl font-bold text-white mr-2">
              STREAMY
            </h1>
          </Link>
        </div>
      </div>
      <div className=" w-full h-1/3 md:h-1/2 lg:h-[calc(100vh-200px)] border rounded-md overflow-hidden">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              className="svg"
            >
              <g class="g-group">
                <circle class="dot" cx="30vw" />
                <circle class="dot" cx="40vw" />
                <circle class="dot" cx="50vw" />
                <circle class="dot" cx="60vw" />
                <circle class="dot" cx="70vw" />
              </g>
            </svg>
          </div>
        ) : (
          <iframe
            className=" w-full h-full"
            src={data.iframe}
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className=" text-center">
        <h1 className=" block lg:hidden text-xl ">
          <span className=" text-2xl font-bold">Watching Now:</span> {data.title}
        </h1>
      </div>
    </div>
  );
};

export default Player;
