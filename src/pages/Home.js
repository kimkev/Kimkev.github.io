import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="col">
          <h2>Column 1</h2>
          <ul className="home-list">
            <li>Section 1</li>
            <li>Section 2</li>
            <li>Section 3</li>
          </ul>
        </div>
        <div className="col">
          <h2>Column 2</h2>
          <ul className="home-list">
            <li>Section 1</li>
            <li>Section 2</li>
            <li>Section 3</li>
          </ul>
        </div>
        <div className="col">
          <h2>Column 3</h2>
          <ul className="home-list">
            <li>Section 1</li>
            <li>Section 2</li>
            <li>Section 3</li>
          </ul>
        </div>
      </div>
    </>
  )
};

export default Home;