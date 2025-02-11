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
import Loading from "./components/Loading";

export const server = "https://streamy-ott-backend.onrender.com/"

// Redirect authenticated users to home if they visit /login
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, user, isLoading } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-[100vh] flex items-center justify-center">
          <Loading/>
        </div>
      ) : (
        <Routes>
          {/* Default Route Redirects to Home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Public Routes */}
          <Route path="/home" element={<Home />} />

          <Route
            path="/auth"
            element={
              <RedirectAuthenticatedUser>
                <Auth />
              </RedirectAuthenticatedUser>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shows"
            element={
              <ProtectedRoute>
                <Shows />
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

          {/* Movie & Series Players - Now Protected */}
          <Route
            path="/movieplayer/:id"
            element={
              <ProtectedRoute>
                <Movieplayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seriesplayer/:id"
            element={
              <ProtectedRoute>
                <Seriesplayer />
              </ProtectedRoute>
            }
          />

          {/* Other Player Routes */}
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

          {/* Email Verification */}
          <Route path="/verify-email" element={<EmailVerification />} />
        </Routes>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
