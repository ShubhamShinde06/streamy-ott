import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../App";

export const FrontendContext = createContext();

const FrontendContextProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const [allData, setAllData] = useState([]);
  const [new_release, setNew_release] = useState([]);
  const [posterdata, setPosterData] = useState([]);
  const [moviedata, setMovieData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [genreData, setGenreData] = useState({});

  const getContent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(server + `api/mix/get-mix`);

      if (response.data.success) {
        const sortedContent = response.data.data.content.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        const poster = response.data.data.content.filter(
          (item) => item.poster === true,
        );
        const movie = response.data.data.content.filter(
          (item) => item.category === "movie",
        );
        const series = response.data.data.content.filter(
          (item) => item.category === "series",
        );

        const genreData = {};

        // Set to track used movies/shows (so they appear only once)
        const usedContent = new Set();

        sortedContent.forEach((item) => {
          let genres = [];
          if (typeof item.genre === "string") {
            genres = item.genre.split("•").map((g) => g.trim()); // Split & trim spaces
          } else if (Array.isArray(item.genre)) {
            genres = item.genre;
          }

          // Assign the movie/show to the first genre only (to avoid repetition)
          const primaryGenre = genres[0];
          if (primaryGenre && !usedContent.has(item._id)) {
            if (!genreData[primaryGenre]) {
              genreData[primaryGenre] = [];
            }
            genreData[primaryGenre].push(item);
            usedContent.add(item._id); // Mark as used
          }
        });

        // Limit each genre to 7 items
        Object.keys(genreData).forEach((genre) => {
          genreData[genre] = genreData[genre].slice(0, 7);
        });

        setGenreData(genreData);
        setAllData(sortedContent);
        setPosterData(poster);
        setNew_release(sortedContent.slice(0, 7));
        setMovieData(movie.slice(0, 7));
        setSeriesData(series.slice(0, 7));
        setLoading(false);
      } else {
        //toast.error(response.data.message)
        console.log(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getContent();
  }, []);

  const value = {
    allData,
    setAllData,
    new_release,
    setNew_release,
    posterdata,
    setPosterData,
    moviedata,
    setMovieData,
    seriesData,
    setSeriesData,
    loading,
    setLoading,
    genreData,
  };

  return (
    <FrontendContext.Provider value={value}>
      {props.children}
    </FrontendContext.Provider>
  );
};

export default FrontendContextProvider;
