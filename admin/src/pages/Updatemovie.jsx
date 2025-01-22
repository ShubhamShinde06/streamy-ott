import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import upload_img from "../assets/upload_area.png";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../context/adminContext";
import Loader from '../components/Loader'

const Updatemovie = () => {

  const { id } = useParams();

  const {loading, setLoading, contentData} = useContext(AdminContext)

  const [genre, setGenre] = useState([]);
  const [poster, setPoster] = useState(false);
  const [plot, setPlot] = useState("");
  const [title, setTitle] = useState("");
  const [release_year, setRelease_year] = useState("");
  const [runtime_minutes, setRuntime_minutes] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState("");
  const [video_link, setVideo_link] = useState("");
  const [download_link, setDownload_link] = useState("");

  const getSingleContent = async () => {
    try {
      
      const response = await axios.get(`/api/movies/get-single-movies/${id}`)
      if(response.data.success){
        console.log(response.data.movie)
        setGenre([response.data.movie.genre])
        setTitle(response.data.movie.title)
        setDirector(response.data.movie.director)
        setPoster(response.data.movie.poster)
        setRelease_year(response.data.movie.release_year)
        setRuntime_minutes(response.data.movie.runtime_minutes)
        setRating(response.data.movie.rating)
        setVideo_link(response.data.movie.video_link)
        setDownload_link(response.data.movie.download_link)
        setPlot(response.data.movie.plot)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    getSingleContent()
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {

      const response = await axios.put(`/api/movies/update-movie/${id}`, {
        genre,title,plot,release_year,runtime_minutes,director,rating,video_link,download_link,poster
      });
      if (response.data.success) {
        await contentData
        toast.success(response.data.message);
        setLoading(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setLoading(false)
    }
  };

  return (
    <div className="w-full h-full flex p-2 xl:p-5">
    <Sidebar />
    <div className="w-full xl:w-[calc(100vw-20vw)] xl:pl-5">
      <Header tag={"Update Movie"} />
      <div className="w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg  -white/20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll show-scroll">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="w-full flex gap-2">
                    <input
                      type="number"
                      placeholder="Release Year"
                      className="w-1/2 py-3 px-2  rounded-md bg-white/10 text-xl"
                      required
                      value={release_year}
                      onChange={(e) => setRelease_year(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Runtime minutes"
                      className="w-1/2 py-3 px-2  rounded-md bg-white/10 text-xl"
                      required
                      value={runtime_minutes}
                      onChange={(e) => setRuntime_minutes(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <textarea
                    placeholder="Plot"
                    required
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                    className="w-full py-6 px-2  rounded-md bg-white/10 text-xl"
                  ></textarea>
                </div>
                
                {/* <div className="flex flex-wrap gap-3">
                  <p className="mb-3 text-xl">Choose genre :-</p>
                  {[
                    "Action",
                    "Animation",
                    "Comedy",
                    "Crime",
                    "Drama",
                    "Fantasy",
                    "Historical",
                    "Horror",
                    "Romance",
                    "Science-fiction",
                    "Thriller",
                    "Western",
                    "Other",
                  ].map((item) => (
                    <div
                      key={item}
                      onClick={() =>
                        setGenre((prev) =>
                          prev.includes(item)
                            ? prev.filter((g) => g !== item)
                            : [...prev, item]
                        )
                      }
                      className={`px-3 py-1 flex items-center cursor-pointer outline-dotted rounded-md ${
                        genre.includes(item) ? "bg-[#0D6EFD]" : "bg-white/10"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div> */}

                <div className="flex flex-col md:flex-row gap-5">
                  <input
                    type="number"
                    placeholder="Rating"
                    required
                    className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Director name"
                    required
                    className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                  />
                </div>

                {/* <div>
                  <p className="text-xl mb-2">Characters</p>
                  {inputs.map((input, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder={`Character ${index + 1}`}
                        value={input.value}
                        onChange={(e) => handleInputChange(index, e)}
                        className="flex-1 py-2 px-2  rounded-md my-2 bg-white/10 text-xl"
                      />
                      <button type="button" onClick={() => handleDeleteInput(index)}>
                        <RxCross1 />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddInput}
                    className="mt-2 py-1 px-3 bg-white/10 hover:bg-[#0D6EFD] rounded-md text-white"
                  >
                    Add Character
                  </button>
                </div> */}

                <div className="flex flex-col md:flex-row gap-5">
                  <input
                    type="text"
                    placeholder="Upload video Link"
                    required
                    value={video_link}
                    onChange={(e) => setVideo_link(e.target.value)}
                    className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                  />
                  <input
                    type="text"
                    placeholder="Upload downalod Link"
                    required
                    value={download_link}
                    onChange={(e) => setDownload_link(e.target.value)}
                    className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={poster}
                      onChange={() => setPoster(!poster)}
                      className="w-6 h-6"
                    />
                    <label className="text-2xl cursor-pointer">Poster</label>
                  </div>
                </div>
              </div>
         
          <div className="mt-8 w-full">
            <button
              type="submit"
              disabled={loading}
              className=" flex justify-center items-center disabled:cursor-not-allowed w-full py-4 hover:bg-white/10 rounded-md bg-[#0D6EFD] text-2xl"
            >
              {loading ? <Loader/> : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Updatemovie