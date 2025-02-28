import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server } from "../App";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [sideMenu, setSideMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const [TopViewMovies, setTopViewMovies] = useState([])
  const [TopViewShows, setTopViewShows] = useState([])

  const [movieTotal, setMovieTotal] = useState();
  const [seriesTotal, setSeriesTotal] = useState();
  const [userTotal, setUserTotal] = useState();
  const [reportTotal, setReportTotal] = useState();

  const getContent = async () => {
    try {
      const response = await axios.get(server + "/api/mix/get-mix");
      if (response.data.success) {
        const sortedContent = response.data.data.content.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setContentData(sortedContent);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getMovieTotal = async () => {
    try {
      const response = await axios.get(server + "/api/movies/get-movies");
      if (response.data.success) {
        setMovies(
          response.data.movies.sort((a, b) => b.rating - a.rating).slice(0, 7),
        );
        setMovieTotal(response.data.total);
        setTopViewMovies(response.data.movies.sort((a, b) => b.visitCount - a.visitCount).slice(0,7))
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getSeriesTotal = async () => {
    try {
      const response = await axios.get(server + "/api/series/get-series");
      if (response.data.success) {
        setSeries(
          response.data.series.sort((a, b) => b.rating - a.rating).slice(0, 7),
        );
        setSeriesTotal(response.data.total);
        setTopViewShows(response.data.series.filter(series => series.visitCount > 0).sort((a, b) => b.visitCount -  a.visitCount).slice(0,7))

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUsersTotal = async () => {
    try {
      const response = await axios.get(server + "/api/auth/users-get");
      if (response.data.success) {
        setUserTotal(response.data.total);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getReportsTotal = async () => {
    try {
      const response = await axios.get(server + "/api/report/get");
      if (response.data.success) {
        setReportTotal(response.data.total);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getContent();
    getMovieTotal();
    getSeriesTotal();
    getUsersTotal();
    getReportsTotal();
  }, []);

  const value = {
    sideMenu,
    setSideMenu,
    loading,
    setLoading,
    contentData,
    setContentData,
    movies,
    series,
    TopViewMovies,
    TopViewShows,

    movieTotal,
    seriesTotal,
    userTotal,
    reportTotal,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
