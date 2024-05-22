import './App.css';
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Home';
import About from './Components/About';
import ViewDiseases from './Components/ViewDiseases';
import ViewDrugs from './Components/ViewDrugs';
import AddDisease from './Components/AddDisease';
import AddDrug from './Components/AddDrug';
import SearchDiseases from './Components/searchDiseases';
import SearchDrugs from './Components/searchDrugs';

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/view-disease" element={<ViewDiseases/>} />
          <Route path="/view-medicine" element={<ViewDrugs/>} />
          <Route path="/add-disease" element={<AddDisease/>} />
          <Route path="/add-medicine" element={<AddDrug/>} />
          <Route path="/search-disease" element={<SearchDiseases/>} />
          <Route path="/search-drug" element={<SearchDrugs/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
