// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NavigationBar.css'

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-options">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;