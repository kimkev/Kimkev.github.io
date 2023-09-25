import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = ({ isHomePage }) => {
  return (
    <footer>
      <span>
        Copyright © {new Date().getFullYear()} Kevin Kim
      </span>
      {/* render link if not homepage */}
      {!isHomePage &&
        <div id='paypal'>
          <a href="https://paypal.me/kkim13">PPal</a>
        </div>
      }
      <div >
        <Link className="Admin" to="/admin">admin</Link>
      </div>
    </footer>
  );
};

export default Footer;