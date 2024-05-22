import React, { useState, useEffect } from 'react';
import '../Styles/ViewDrugs.css';
import { Link } from 'react-router-dom';
import '../index.css';
import ErrorPopup from '../Components/PopUp.js';

const SearchDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    try {
      const response = await fetch('http://localhost:4004/drug/fetchAll');
      if (!response.ok) {
        throw new Error('Failed to fetch drugs');
      }
      const data = await response.json();
      setDrugs(data);
    } catch (error) {
      console.error('Error fetching drugs:', error);
      setErrorStatus('error');
      setErrorMessage('Error fetching drugs');
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const filteredDrugs = drugs.filter(drug => {
    const searchTerms = searchTerm
      .split(',')
      .map(term => term.trim().toLowerCase());
    return searchTerms.every(term =>
      drug.drugName.toLowerCase().includes(term) ||
      drug.diseaseName.some(disease => disease.toLowerCase().includes(term))
    );
  });

  return (
    <div className='drugContainer'>
      <div className='heading'>Search for Medicines</div>
      <div className='search-container'>
      <input
        type="text"
        placeholder="Search by drug name or disease names (comma separated)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-bar'
      />
      </div>
      <table>
        <thead>
          <tr>
            <th>Drug Name</th>
            <th>Linked Diseases</th>
            <th>Drug Dosage</th>
            <th>Drug Unit</th>
            <th>Drug Mode</th>
            <th>Animal Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrugs.map((drug, index) => (
            <tr key={index}>
              <td>{drug.drugName}</td>
              <td>{drug.diseaseName.join(', ')}</td>
              <td>{drug.drugDosage}</td>
              <td>{drug.drugUnit}</td>
              <td>{drug.drugMode}</td>
              <td>{drug.animalType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showError && (
        <ErrorPopup type={errorStatus} message={errorMessage} onClose={handleCloseError} />
      )}
    </div>
  );
};

export default SearchDrugs;
