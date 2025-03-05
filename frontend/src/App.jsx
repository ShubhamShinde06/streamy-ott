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

export const server =
  import.meta.env.MODE === "development" ? "http://localhost:8000/" : "/";

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, user } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [user && checkAuth]);

  return (
    <div className="w-full h-full">
      <Routes>
        {/* Default Route Redirects to Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />

        {/* Authentication Routes */}
        <Route
          path="/auth"
          element={
            <RedirectAuthenticatedUser>
              <Auth />
            </RedirectAuthenticatedUser>
          }
        />

        {/* Password Recovery Routes */}
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <EmailSendFrongotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <PasswordSet />
            </RedirectAuthenticatedUser>
          }
        />

        {/* Movie & Series Players - No Protection */}
        <Route path="/movieplayer/:id" element={<Movieplayer />} />
        <Route path="/seriesplayer/:id" element={<Seriesplayer />} />

        {/* Protected Routes */}
        <Route
          path="/iframeM/:id"
          element={
            <ProtectedRoute>
              <Player />
            </ProtectedRoute>
          }
        />
        <Route
          path="/iframeS/:seriesId/:episodeId"
          element={
            <ProtectedRoute>
              <PlayerW />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Email Verification */}
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
