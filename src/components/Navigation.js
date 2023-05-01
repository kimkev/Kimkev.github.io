import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import './Navigation.css';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav>
      <div className="navbar-container">
        <h1 className="navbar-title"><Link to="/">My Website</Link></h1>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
        </button>
        <ul className={`navbar-links ${isExpanded ? "expanded" : ""}`}>
          <li className="navbar-link-item"><Link to="/apps">Apps</Link></li>
          <li className="navbar-link-item"><a href="https://twitter.com/">Twitter</a></li>
          <li className="navbar-link-item"><a href="https://www.facebook.com/">Facebook</a></li>
          <li className="navbar-link-item"><a href="https://www.instagram.com/">Instagram</a></li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;


