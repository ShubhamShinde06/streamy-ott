import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from './pages/Auth' 

function App() {
  return (
    <div className=" w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
