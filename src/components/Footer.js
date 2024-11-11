import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = ({ isHomePage }) => {
  return (
    <footer>
      <span>
        Copyright © {new Date().getFullYear()} Kevin Kim
      </span>
      <div >
        <Link className="Admin" to="/admin">admin</Link>
      </div>
    </footer>
  );
};

export default Footer;