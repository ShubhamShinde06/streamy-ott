import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from './pages/Auth' 
import Movieplayer from "./pages/Movieplayer";
import Seriesplayer from "./pages/Seriesplayer";
import Search from "./pages/Search";
import Movies from "./pages/MOvies";
import Shows from "./pages/Shows";
import MyList from "./pages/MyList";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import Player from "./pages/Player";

function App() {
  return (
    <div className=" w-full h-full">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/saved" element={<MyList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movieplayer/:id" element={<Movieplayer />} />
        <Route path="/seriesplayer/:id" element={<Seriesplayer />} />
        <Route path="/iframe/:id" element={<Player />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
