import React, { useState, useEffect } from 'react';
import '../Styles/ViewDrugs.css';
import { Link } from 'react-router-dom';
import '../index.css';
import ErrorPopup from '../Components/PopUp.js';

const ViewDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  const [editedDiseaseNames, setEditedDiseaseNames] = useState('');
  const [originalDiseaseNames, setOriginalDiseaseNames] = useState('');


  useEffect(() => {
    fetchDrugs();
  }, []);

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
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/drug/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete drug');
      }
      setErrorStatus('success');
      setErrorMessage('Drug Deleted Successfully.');
      setShowError(true);
      fetchDrugs(); // Reload drugs after successful deletion
    } catch (error) {
      console.error('Error deleting drug:', error);
      setErrorStatus('error');
      setErrorMessage('Error Deleting Drug');
      setShowError(true);
    }
  };

  const handleEdit = (drug) => {
    setEditableRow(drug._id);
    setEditedDiseaseNames(drug.diseaseName.join(', '));
    setOriginalDiseaseNames(drug.diseaseName.join(', '));
  };

  const handleSave = async (id) => {
    const drugToUpdate = drugs.find((drug) => drug._id === id);
    const updatedDrug = {
      ...drugToUpdate,
      diseaseName: editedDiseaseNames.split(',').map((name) => name.trim()),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/drug/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDrug),
      });
      if (!response.ok) {
        throw new Error('Failed to update drug');
      }
      setErrorStatus('success');
      setErrorMessage('Drug Updated Successfully.');
      setShowError(true);
      setEditableRow(null);
      fetchDrugs(); // Reload drugs after successful update
    } catch (error) {
      console.error('Error updating drug:', error);
      setErrorStatus('error');
      setErrorMessage('Error Updating Drug');
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCancel = () => {
    setEditableRow(null);
    setEditedDiseaseNames(originalDiseaseNames); // Revert to original disease names
  };

  return (
    <div className='drugContainer'>
      <div className='heading'>All Medicines</div>
      <div className='button-container'>
        <Link to='/add-disease'>
          <button>Add Disease</button>
        </Link>
        <Link to='/view-disease'>
          <button>View Disease</button>
        </Link>
        <Link to='/add-medicine'>
          <button>Add Medicine</button>
        </Link>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <tr key={index}>
              <td>{drug.drugName}</td>
              {editableRow === drug._id ? (
                <>
                  <td>
                    <input
                      type='text'
                      value={editedDiseaseNames}
                      onChange={(e) => setEditedDiseaseNames(e.target.value)}
                      className='editable-input'
                    />
                  </td>
                  <td>{drug.drugDosage}</td>
                  <td>{drug.drugUnit}</td>
                  <td>{drug.drugMode}</td>
                  <td>{drug.animalType}</td>
                  <td>
                    <button onClick={() => handleSave(drug._id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{drug.diseaseName.join(', ')}</td>
                  <td>{drug.drugDosage}</td>
                  <td>{drug.drugUnit}</td>
                  <td>{drug.drugMode}</td>
                  <td>{drug.animalType}</td>
                  <td>
                    <button className='edit-btn' onClick={() => handleEdit(drug)}></button>
                    <button className='del-btn' onClick={() => handleDelete(drug._id)}></button>
                  </td>
                </>
              )}
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

export default ViewDrugs;
