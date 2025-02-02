import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { toast } from "react-toastify";
import axios from "axios";
import upload_img from "../assets/upload_area.png";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../context/adminContext";
import Loader from "../components/Loader";

const Updateseries = () => {

  const {id} = useParams()

  const {loading, setLoading} = useContext(AdminContext)

  const [poster, setPoster] = useState(false);
  const [description, setPlot] = useState("");
  const [series_name, setTitle] = useState("");
  const [release_year_start, setRelease_year] = useState("");
  const [total_seasons, setTotal_seasons] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState("");
  const [seasons, setSeasons] = useState([
    {
      season_number: 1,
      release_year: "",
      episodes: [
        {
          episode_number: 1,
          title: "",
          plot: "",
          runtime_minutes: "",
          videoLink: "",
          downloadLink: ""
        },
      ],
    },
  ]);

  // Add new season
  const handleAddSeason = () => {
    setSeasons([
      ...seasons,
      { season_number: seasons.length + 1, release_year: "", episodes: [] },
    ]);
  };

  // Add new episode to a season
  const handleAddEpisode = (seasonIndex) => {
    const newSeasons = [...seasons];
    newSeasons[seasonIndex].episodes.push({
      episode_number: newSeasons[seasonIndex].episodes.length + 1,
      title: "",
      plot: "",
      runtime_minutes: "",
      videoLink: "",
    });
    setSeasons(newSeasons);
  };

  // Update season and episode fields
  // const handleSeasonChange = (index, event) => {
  //   const updatedSeasons = [...seasons];
  //   updatedSeasons[index][event.target.name] = event.target.value;
  //   setSeasons(updatedSeasons);
  // };
  const handleSeasonChange = (index, event) => {
    const updatedSeasons = [...seasons];
    const { name, value } = event.target;
    updatedSeasons[index][name] = name === 'release_year' ? Number(value) : value;
    setSeasons(updatedSeasons);
  };
  

  const handleEpisodeChange = (seasonIndex, episodeIndex, event) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[seasonIndex].episodes[episodeIndex][event.target.name] =
      event.target.value;
    setSeasons(updatedSeasons);
  };

  const getSingleContent = async () => {
    try {
      
      const response = await axios.get(`/api/series/${id}`)
      if(response.data.success){
        console.log(response.data.series)
        setTitle(response.data.series.series_name)
        setRelease_year(response.data.series.release_year_start)
        setTotal_seasons(response.data.series.total_seasons)
        setPlot(response.data.series.description)
        setSeasons(response.data.series.seasons)
        setRating(response.data.series.rating)
        setDirector(response.data.series.director)
        setPoster(response.data.series.poster)
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
      const response = await axios.put(`/api/series/update-series/${id}`, {
        series_name, release_year_start, total_seasons, description, seasons, rating, director, poster
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setLoading(false)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
      setLoading(false)
    }
  };

  return (
    <div className="w-full h-full flex p-2 xl:p-5">
      <Sidebar />
      <div className="w-full xl:w-[calc(100vw-20vw)] xl:pl-5">
        <Header tag={"Upload Web Series"} />
        <div className="w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg  -white/20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll show-scroll">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5">
                {/* series_name */}
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                  required
                  value={series_name}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="w-full flex gap-2">
                  {/* release_year_start */}
                  <input
                    type="number"
                    placeholder="Release Year"
                    className="w-1/2 py-3 px-2  rounded-md bg-white/10 text-xl"
                    required
                    value={release_year_start}
                    onChange={(e) => setRelease_year(e.target.value)}
                  />
                  {/* total_seasons */}
                  <input
                    type="number"
                    placeholder="Total Seasons"
                    className="w-1/2 py-3 px-2  rounded-md bg-white/10 text-xl"
                    required
                    value={total_seasons}
                    onChange={(e) => setTotal_seasons(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {/* description */}
                <textarea
                  placeholder="Plot"
                  required
                  value={description}
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
                {/* rating */}
                <input
                  type="number"
                  placeholder="Rating"
                  required
                  className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                {/* director */}
                <input
                  type="text"
                  placeholder="Director name"
                  required
                  className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                />
              </div>

              {/* characters */}
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
                    <button
                      type="button"
                      onClick={() => handleDeleteInput(index)}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddInput}
                  className="mt-2 py-1 px-3 bg-[#0D6EFD] rounded-md text-white"
                >
                  Add Character
                </button>
              </div> */}

            </div>
            {/* Season & episodes */}
            <div className=" my-5">
              {seasons.map((season, seasonIndex) => (
                <div
                  key={seasonIndex}
                  className=" p-3 mb-4 outline-dotted rounded-md"
                >
                  <h3 className=" text-xl py-2">
                    Season {season.season_number}
                  </h3>
                  <input
                    type="number"
                    name="release_year"
                    placeholder="Release Year"
                    className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                    value={season.release_year}
                    onChange={(e) => handleSeasonChange(seasonIndex, e)}
                  />

                  {season.episodes.map((episode, episodeIndex) => (
                    <div
                      key={episodeIndex}
                      className="mt-5 flex gap-5 flex-wrap pb-5 border-b-2"
                    >
                      <h4 className="text-xl ">
                        Episode {episode.episode_number}
                      </h4>
                      <input
                        type="text"
                        name="title"
                        placeholder="Episode Title"
                        className="w-full py-3 px-2 mt-[-10px]  rounded-md bg-white/10 text-xl"
                        value={episode.title}
                        onChange={(e) =>
                          handleEpisodeChange(seasonIndex, episodeIndex, e)
                        }
                      />
                      <textarea
                        name="plot"
                        placeholder="Episode Plot"
                        className="w-full py-3 px-2 h-20  rounded-md bg-white/10 text-xl show-scroll"
                        value={episode.plot}
                        onChange={(e) =>
                          handleEpisodeChange(seasonIndex, episodeIndex, e)
                        }
                      />
                      <input
                        type="text"
                        name="runtime_minutes"
                        placeholder="Runtime (minutes)"
                        className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                        value={episode.runtime_minutes}
                        onChange={(e) =>
                          handleEpisodeChange(seasonIndex, episodeIndex, e)
                        }
                      />
                      <input
                        type="text"
                        name="videoLink"
                        placeholder="Video Link"
                        className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                        value={episode.videoLink}
                        onChange={(e) =>
                          handleEpisodeChange(seasonIndex, episodeIndex, e)
                        }
                      />
                      <input
                        type="text"
                        name="downloadLink"
                        placeholder="Download Link"
                        className="w-full py-3 px-2  rounded-md bg-white/10 text-xl"
                        value={episode.downloadLink}
                        onChange={(e) =>
                          handleEpisodeChange(seasonIndex, episodeIndex, e)
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-5 py-1 px-3 bg-white/10 hover:bg-[#0D6EFD] rounded-md text-white"
                    onClick={() => handleAddEpisode(seasonIndex)}
                  >
                    Add Episode
                  </button>
                </div>
              ))}
              <button
                className="w-full md:w-1/4 bg-white/10 hover:bg-[#0D6EFD] py-2 rounded-md text-2xl "
                type="button"
                onClick={handleAddSeason}
              >
                Add Season
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-5 mt-5">
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

            <div className="mt-8 flex justify-start">
              <button
                type="submit"
                disabled={loading}
                className="  disabled:cursor-not-allowed flex items-center justify-center w-full py-4 hover:bg-white/10 rounded-md bg-[#0D6EFD] text-2xl"
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

export default Updateseries