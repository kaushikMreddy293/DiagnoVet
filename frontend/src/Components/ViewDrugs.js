import React, { useState, useEffect } from 'react';
import '../Styles/ViewDrugs.css'
import { Link } from 'react-router-dom';
import '../index.css'
import ErrorPopup from '../Components/PopUp.js';
const ViewDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);

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
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4004/drug/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete drug');
      }
      // Reload drugs after successful deletion
      setErrorStatus('success');
      setErrorMessage('Drug Deleted Successfully.');
      setShowError(true)
      fetchDrugs();
    } catch (error) {
      console.error('Error deleting drug:', error);
      // Handle error with popup or other UI feedback
      setErrorStatus('error');
      setErrorMessage('Error Deleting Drug');
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <div className='drugContainer'>
      <div className='heading'>All Medicines</div>
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
            {/* <Link to="/view-meds">
              <button>View Medicine</button>
            </Link> */}
          </div>
      <table>
        <thead>
          <tr>
            <th>Disease Name</th>
            <th>Drug Name</th>
            <th>Drug Dosage</th>
            <th>Drug Unit</th>
            <th>Drug Mode</th>
            <th>Animal Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={index}>
              <td>{drug.diseaseName.join(', ')}</td>
              <td>{drug.drugName}</td>
              <td>{drug.drugDosage}</td>
              <td>{drug.drugUnit}</td>
              <td>{drug.drugMode}</td>
              <td>{drug.animalType}</td>
              <td>
                <button onClick={() => handleDelete(drug._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showError && <ErrorPopup type={errorStatus} message={errorMessage} onClose={handleCloseError} />}
   
    </div>
  );
}

export default ViewDrugs;
