import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Addmovie from "./pages/Addmovie";
import Addseries from "./pages/Addseries";
import Movielist from "./pages/Movielist";
import Serieslist from "./pages/Serieslist";
import {ToastContainer} from 'react-toastify'

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/uploadM" element={<Addmovie/>} />
      <Route path="/uploadS" element={<Addseries/>} />
      <Route path="/listM" element={<Movielist/>} />
      <Route path="/listS" element={<Serieslist/>} />
    </Routes>
    <ToastContainer/>
    </>
    
  );
}
