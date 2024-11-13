import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import resume from '../public/Kevin_Kim_Resume.pdf';
import BackButton from './BackButton.js';

const NavigationBar = () => {

  const name = 'Kevin Kim';
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMouseHovering, setIsMouseHovering] = useState(false);
  
  const location = useLocation();
  const isNotHomePage = location.pathname !== '/';

  const title = name.split('').map((char, index) => {
    return <span key={index}>{char}</span>
  })

  const handleMouseEnter = () => {
    setDropdownVisible(true);
    setIsMouseHovering(true);
  };

  const handleMouseLeave = () => {
    setIsMouseHovering(false);
  };

  useEffect(() => {
    let timeoutId;

    if (!isMouseHovering) {
      timeoutId = setTimeout(() => {
        setDropdownVisible(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMouseHovering]);


  function RenderComponent() {
    return (
      <>
        {location.pathname !== '/' ? <BackButton /> : null}
      </>
    );
  }


  return (
    <>
      <nav className={isNotHomePage ? "navbar active" : "navbar"}>
        <Link to="/">
          <div className="navbar-title">
            {title}
          </div>
        </Link>

        <div
          className="navbar-socials"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="navbar-socials-group">
            Profile
          </div>
          {dropdownVisible &&
            <div
              id="dropdown-list"
              className="navbar-socials-dropdown"
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
      <RenderComponent />
    </>
  );
};

export default NavigationBar;