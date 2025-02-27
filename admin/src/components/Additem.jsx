import React from "react";
import upload_img from "../assets/upload_area.png";
import { RxCross1 } from "react-icons/rx";

const Additem = ({
  inputs,
  handleInputChange,
  handleAddInput,
  handleDeleteInput,
  genre,
  setGenre,
  image1,
  setImage1,
  image2,
  setImage2,
  poster,
  setPoster,
  plot,
  setPlot,
  title,
  setTitle,
  release_year,
  setRelease_year,
  runtime_minutes,
  setRuntime_minutes,
  director,
  setDirector,
  rating,
  setRating,
  video_link,
  setVideo_link,
}) => {
  return (
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
            type="text"
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
                  : [...prev, item],
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
  );
};

export default Additem;
