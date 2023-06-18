import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
