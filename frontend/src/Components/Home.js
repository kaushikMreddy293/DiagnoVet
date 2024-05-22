// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css'

const Home = () => {
    return (
        <div className='home-container'>
          <p className='home-heading'>Welcome to DiagnoVet</p>
          <div className="button-container"> {/* Add a class to the container */}
            <Link to="/add-disease">
              <button className='link-btn'>Add Disease</button>
            </Link>
            <Link to="/view-disease">
              <button className='link-btn'>View Disease</button>
            </Link>
            <Link to="/add-medicine">
              <button className='link-btn'>Add Medicine</button>
            </Link>
            <Link to="/view-medicine">
              <button className='link-btn'>View Medicine</button>
            </Link>
          </div>
          <div className='petpic-bg'></div>
          <div className='search-btn-container'>
            <Link to="/search-disease">
              <button className='search-btn'>Search Disease</button>
            </Link>
            <Link to="/search-drug">
              <button className='search-btn'>Search Medicines</button>
            </Link>
          </div>
        </div>
      );
}

export default Home;
