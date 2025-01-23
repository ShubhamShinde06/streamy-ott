import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from './pages/Auth' 
import Movieplayer from "./pages/Movieplayer";
import Seriesplayer from "./pages/Seriesplayer";

function App() {
  return (
    <div className=" w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/movieplayer/:id" element={<Movieplayer />} />
        <Route path="/seriesplayer/:id" element={<Seriesplayer />} />
      </Routes>
    </div>
  );
}

export default App;
