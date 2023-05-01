import React, { useState } from 'react';
import './Navigation.css';
import resume from '../public/Kevin_Kim_Resume.pdf';

const NavigationBar = () => {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
    setIsMouseHovering(true);
  };

  const handleMouseLeave = () => {
    setIsMouseHovering(false);
    setTimeout(() => {
      if (!isMouseHovering) {
        setDropdownVisible(false);
      }
    }, 1000);
  };


  return (
    <nav className="navbar">
      <div className="navbar-title">Kevin Kim</div>
      <div
        className="navbar-socials"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="navbar-socials-group">
          Socials
        </div>
        {dropdownVisible &&
          <div
            id="dropdown-list"
            className="navbar-socials-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul>
              <li><a href="https://github.com/kimkev">Github</a></li>
              <li><a href="https://www.linkedin.com/in/kimkevi/">LinkedIn</a></li>
              <li><a href={resume} target="_blank" rel="noreferrer">Resume</a></li>
            </ul>
          </div>
        }
      </div>
    </nav>
  );
};

export default NavigationBar;