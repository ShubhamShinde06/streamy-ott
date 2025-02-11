import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useUserStore } from "./store/userStore";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Movieplayer from "./pages/Movieplayer";
import Seriesplayer from "./pages/Seriesplayer";
import Search from "./pages/Search";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import MyList from "./pages/MyList";
import Profile from "./pages/Profile";
import Player from "./pages/Player";
import PlayerW from "./pages/PlayerW";
import EmailVerification from "./pages/EmailVerification";
import EmailSendFrongotPassword from "./pages/EmailSendFrongotPassword";
import PasswordSet from "./pages/PasswordSet";

export const server = "https://streamy-ott-backend.onrender.com/";

function App() {

  return (
    <div className="w-full h-full">

      <Routes>
        {/* Default Route Redirects to Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public Routes */}
        <Route path="/home" element={<Home />} />

        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route path="/search" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/saved" element={<MyList />} />
        <Route path="/profile" element={<Profile />} />

        {/* Password Recovery Routes */}
        <Route path="/forgot-password" element={<EmailSendFrongotPassword />} />
        <Route path="/reset-password/:token" element={<PasswordSet />} />

        {/* Movie & Series Players - Now Protected */}
        <Route path="/movieplayer/:id" element={<Movieplayer />} />
        <Route path="/seriesplayer/:id" element={<Seriesplayer />} />

        {/* Other Player Routes */}
        <Route path="/iframeM/:id" element={<Player />} />
        <Route path="/iframeS/:seriesId/:episodeId" element={<PlayerW />} />

        {/* Email Verification */}
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
