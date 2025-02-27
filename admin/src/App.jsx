import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Addmovie from "./pages/Addmovie";
import Addseries from "./pages/Addseries";
import { ToastContainer } from "react-toastify";
import Catalog from "./pages/Catalog";
import Updatemovie from "./pages/Updatemovie";
import Updateseries from "./pages/Updateseries";
import User from "./pages/User";
import Reviews from "./pages/Reviews";

export const server = "http://localhost:8000";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uploadM" element={<Addmovie />} />
        <Route path="/uploadS" element={<Addseries />} />
        <Route path="/updateM/:id" element={<Updatemovie />} />
        <Route path="/updateS/:id" element={<Updateseries />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/users" element={<User />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
      <ToastContainer />
    </>
  );
}
