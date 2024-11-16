import React from "react";
import { Link } from "react-router-dom";
import "./Apps.css";

const Apps = () => {
  return (
    <>
      <div className="container">
        <div className="col">
          <h2>Mini-Games</h2>
          <ul className="home-list col-A">
            <li>
              <Link to="/TicTacToe">Tic-Tac-Toe</Link>
            </li>
            <li>
              <Link to="/AnagramGame">Anagram</Link>
            </li>
            <li>
              <Link to="/TypingGame">Typing</Link>
            </li>
            <li>
              <Link to="/CardGame">Mulligan</Link>
            </li>
          </ul>
        </div>
        <div className="col">
          <h2>Data</h2>
          <ul className="home-list col-B">
            <li>
              <Link to="/ListApp">Lists</Link>
            </li>
            {/* <li>
              <Link to="#">tbd</Link>
            </li>
            <li>
              <Link to="#">tbd</Link>
            </li> */}
          </ul>
        </div>
        {/* <div className="col">
          <h2>Utils</h2>
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
        </div> */}
      </div>
    </>
  )
};

export default Apps;