import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div id='paypal'>
        <a href="https://paypal.me/kkim13">For the generous</a>
      </div>
      Copyright © {new Date().getFullYear()} Kevin Kim
    </footer>
  );
};

export default Footer;