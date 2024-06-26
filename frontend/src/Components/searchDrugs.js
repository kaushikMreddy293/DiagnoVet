import React, { useState, useEffect } from 'react';
import '../Styles/ViewDrugs.css';
import '../index.css';
import '../Styles/searchDrugs.css'
import ErrorPopup from '../Components/PopUp.js';

const SearchDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [weightKgs, setWeightKgs] = useState('');

  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const fetchDrugs = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/drug/fetchAll`);
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

  const handleWeightCalculate = () => {
    const weightInKgs = (parseFloat(weightLbs) * 0.453592).toFixed(2);
    setWeightKgs(weightInKgs);
  };

  return (
    <div className='drugContainer'>
      <div className='heading'>Search for Medicines</div>
      <div className='tool-container'>
      <div className='search-container'>
      <input
        type="text"
        placeholder="Search by drug name or disease names (comma separated)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-bar'
      />
      </div>
      <div className='weight-container'>
        <input
          type="number"
          placeholder="Enter weight in lbs"
          value={weightLbs}
          onChange={(e) => setWeightLbs(e.target.value)}
          className='weight-input'
        />
        <button onClick={handleWeightCalculate} className='calculate-button'>
          Calculate Dosage
        </button>
        {weightKgs && (
          <span className='weight-output'>
            {weightLbs} lbs is {weightKgs} kgs
          </span>
        )}
      </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Drug Name</th>
            <th>Linked Diseases</th>
            <th>Dose</th>
            <th>Unit</th>
            <th>Total Dosage</th>
            <th>Concentration</th>
            <th>Volume</th>
            <th>Mode</th>
            <th>Animal Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrugs.map((drug, index) => (
             <React.Fragment key={drug._id}>
            <tr key={index} onClick={() => handleRowClick(drug._id)}>
              <td>{drug.drugName}</td>
              <td>{drug.diseaseName.join(', ')}</td>
              <td>{drug.drugDosage}</td>
              <td>{drug.drugUnit}</td>
              <td>{weightKgs !== null ? (drug.drugDosage * weightKgs).toFixed(2) : '-'}</td>
              <td>{drug.drugConc}</td>
              <td>{weightKgs !== null ? ((drug.drugDosage * weightKgs)/drug.drugConc).toFixed(2) : '-'}  </td>
              <td>{drug.drugMode}</td>
              <td>{drug.animalType}</td>
            </tr>
            {expandedRow === drug._id && (
                <tr>
                  <td colSpan="8">
                    <div className="expanded-content">
                      {/* Your expanded content goes here */}
                     <strong> Doctor's Notes: </strong> {drug.drugNote}.
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
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
