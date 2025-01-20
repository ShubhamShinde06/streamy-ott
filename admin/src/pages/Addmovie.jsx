import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import upload_img from "../assets/upload_area.png";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/adminContext";
import Loader from '../components/Loader'

const Addmovie = () => {
  const navigateTo = useNavigate();
  const {loading, setLoading} = useContext(AdminContext)

  // State to manage input fields
  const [inputs, setInputs] = useState([{ value: "" }]);

  // Handle input change
  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);
  };

  // Handle adding new input field
  const handleAddInput = () => {
    setInputs([...inputs, { value: "" }]);
  };

  // Handle deleting an input field
  const handleDeleteInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const [genre, setGenre] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [poster, setPoster] = useState(false);
  const [plot, setPlot] = useState("");
  const [title, setTitle] = useState("");
  const [release_year, setRelease_year] = useState("");
  const [runtime_minutes, setRuntime_minutes] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState("");
  const [video_link, setVideo_link] = useState("");
  const [download_link, setDownload_link] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("plot", plot);
      formData.append("release_year", release_year);
      formData.append("runtime_minutes", runtime_minutes);
      formData.append("director", director);
      formData.append("rating", rating);
      formData.append("video_link", video_link);
      formData.append("download_link", download_link);
      formData.append("poster", poster);
      formData.append("genre", JSON.stringify(genre));
      formData.append(
        "characters",
        JSON.stringify(inputs.map((input) => input.value))
      );

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);

      const response = await axios.post("/api/movies/upload", formData);

      if (response.data.success) {
        toast.success(response.data.message);
        navigateTo(0, { replace: true });
        setLoading(false)
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
        <Header tag={"Upload Movie"} />
        <div className="w-full mt-5 px-5 py-5 h-[calc(100vh-140px)] bg-gradient-to-b from-blue-900/80 to-blue-800/20 text-[#fff] backdrop-blur-lg  -white/20 rounded-2xl shadow-black/70 shadow-2xl overflow-scroll show-scroll">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-5">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full md:w-1/2 lg:w-1/5 h-60  rounded-md overflow-hidden">
                      <label htmlFor="image1">
                        <img
                          src={!image1 ? upload_img : URL.createObjectURL(image1)}
                          alt="front_img"
                          className="w-full h-full cursor-pointer"
                        />
                        <input
                          type="file"
                          id="image1"
                          hidden
                          onChange={(e) => setImage1(e.target.files[0])}
                        />
                      </label>
                    </div>
                    <div className="w-full h-60  rounded-md overflow-hidden">
                      <label htmlFor="image2">
                        <img
                          src={!image2 ? upload_img : URL.createObjectURL(image2)}
                          alt="back_img"
                          className="w-full h-full cursor-pointer"
                        />
                        <input
                          type="file"
                          id="image2"
                          hidden
                          onChange={(e) => setImage2(e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
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
                        type="number"
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
                  <div className="flex flex-wrap gap-3">
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
                  </div>
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
                  <div>
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
                      className="mt-2 py-1 px-3 bg-[#0D6EFD] rounded-md text-white"
                    >
                      Add Character
                    </button>
                  </div>
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
           
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className=" flex justify-center items-center disabled:cursor-not-allowed md:w-1/4 w-full py-2 hover:bg-white/10 rounded-md bg-[#0D6EFD] text-2xl"
              >
                {loading ? <Loader/> : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addmovie;
