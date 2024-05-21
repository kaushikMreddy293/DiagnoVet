// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css'

const Home = () => {
    return (
        <div>
          <h1>Welcome to DiagnoVet</h1>
          <div className="button-container"> {/* Add a class to the container */}
            <Link to="/add-disease">
              <button>Add Disease</button>
            </Link>
            <Link to="/view-disease">
              <button>View Disease</button>
            </Link>
            <Link to="/add-medicine">
              <button>Add Medicine</button>
            </Link>
            <Link to="/view-medicine">
              <button>View Medicine</button>
            </Link>
          </div>
          <div className='petpic-bg'></div>
        </div>
      );
}

export default Home;
