import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div id='paypal'>
        <a href="https://paypal.me/kkim13">For the generous</a>
      </div>
      <span>
        Copyright © {new Date().getFullYear()} Kevin Kim
      </span>

      <div className="Admin">
        <Link to="/admin">admin</Link>
      </div>
    </footer>
  );
};

export default Footer;