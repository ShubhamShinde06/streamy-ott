import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import FrontendContextProvider from "./context/frontendContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FrontendContextProvider>
      <App />
    </FrontendContextProvider>
  </BrowserRouter>
);
