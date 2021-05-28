import React from "react";
import HPSlider from "../components/HPSlider";
import Promotion from "../components/Promotion";
import NewArrival from "../components/NewArrival";

import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <HPSlider />
      <Promotion />
      <NewArrival />
    </div>
  );
};

export default Home;
