import React from "react";
import HomeSlider from "../components/HomeSlider.jsx";
import Donors from "../components/Donors.jsx";
import Team from "../components/Team.jsx";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <Donors />
      <Team />
    </>
  );
};

export default Home;
