import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="profile">
          <div className="Intro">
            <h1>Welcome</h1>
            <p>
              My name is Kevin Kim, I am Web Developer based in Ontario, Canada.
            </p>
          </div>

          <div className="Projects">
            <h1>Projects</h1>
            <ul>
              <li><Link to="/application">React Apps</Link></li>
              <li><a href="https://kimkev.itch.io/">Game Development in Unity</a></li>
            </ul>
          </div>
        </div>

      </div>
    </>
  )
};

export default Home;