import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Link to="/application">React Apps</Link>
      </div>
    </>
  )
};

export default Home;