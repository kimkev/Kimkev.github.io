import React, { useState } from 'react';
import './Navigation.css';

const NavigationBar = () => {

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!dropdownVisible) {
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
              <li><a href="../../public/files/Kevin_Kim_Resume.pdf">Resume</a></li>
            </ul>
          </div>
        }
      </div>
    </nav>
  );
};

export default NavigationBar;