import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Application = () => {
  return (
    <>
      <div className="home-container">
        <div className="col">
          <h2>Mini games</h2>
          <ul className="home-list col-A">
            <li>
              <Link to="/TicTacToe">TicTacToe</Link>
            </li>
            <li>
              <Link to="/TypingGame">Typing Game</Link>
            </li>
            <li>
              <Link to="/AnagramGame">Anagram</Link>
            </li>

          </ul>
        </div>
        <div className="col">
          <h2>Column 2</h2>
          <ul className="home-list col-B">
            <li>
              <Link to="#">tbd</Link>
            </li>
            <li>
              <Link to="#">tbd</Link>
            </li>
            <li>
              <Link to="#">tbd</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h2>Column 3</h2>
          <ul className="home-list col-C">
            <li>
              <Link to="#">tbd</Link>
            </li>
            <li>
              <Link to="#">tbd</Link>
            </li>
            <li>
              <Link to="#">tbd</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
};

export default Application;