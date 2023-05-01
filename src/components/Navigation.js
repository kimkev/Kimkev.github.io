import React, { useState } from 'react';
import './Navigation.css';

const NavigationBar = () => {

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    // Check whether the user is currently hovering over the socials dropdown
    setTimeout(() => {
      if (!dropdownVisible) {
        setDropdownVisible(false);
      }
    }, 1000);
  };

  const handleDropdownMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleDropdownMouseLeave = () => {
    setTimeout(() => {
      if (!dropdownVisible) {
        setDropdownVisible(false);
      }
    }, 2000);
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Kevin Kim</div>
      <div
        className="navbar-socials"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="navbar-socials-button">Socials</button>
        {dropdownVisible && (
          <div
            className="navbar-socials-dropdown"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <ul
            >
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;