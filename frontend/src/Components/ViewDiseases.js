import React, { useState, useEffect } from 'react';
import '../Styles/ViewDiseases.css';
import { Link } from 'react-router-dom';
import '../index.css';
import ErrorPopup from '../Components/PopUp.js';

const ViewDiseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [editedSymptoms, setEditedSymptoms] = useState('');
  const [editedDrugNames, setEditedDrugNames] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/diagnosis/fetchAll`);
      if (!response.ok) {
        throw new Error('Failed to fetch diseases');
      }
      const data = await response.json();
      setDiseases(data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/diagnosis/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete disease');
      }
      setErrorStatus('success');
      setErrorMessage('Disease Deleted Successfully.');
      setShowError(true);
      fetchDiseases(); // Reload diseases after successful deletion
    } catch (error) {
      console.error('Error deleting disease:', error);
      setErrorStatus('error');
      setErrorMessage('Error deleting disease');
      setShowError(true);
    }
  };

  const handleEdit = (disease) => {
    setEditableRow(disease._id);
    setEditedSymptoms(disease.diseaseSymptoms.join(', '));
    setEditedDrugNames(disease.drugNames.join(', '));
  };

  const handleSave = async (id) => {
    const updatedSymptoms = editedSymptoms.split(',').map(symptom => symptom.trim());
    const updatedDrugNames = editedDrugNames.split(',').map(drug => drug.trim());

    const updatedDisease = {
      diseaseSymptoms: updatedSymptoms,
      drugNames: updatedDrugNames,
      diseaseName: diseases.find(d => d._id === id).diseaseName,
      animalType: diseases.find(d => d._id === id).animalType,
      drugMode: diseases.find(d => d._id === id).drugMode
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/diagnosis/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDisease),
      });
      if (!response.ok) {
        throw new Error('Failed to update disease');
      }
      setErrorStatus('success');
      setErrorMessage('Disease Updated Successfully.');
      setShowError(true);
      setEditableRow(null);
      fetchDiseases(); // Reload diseases after successful update
    } catch (error) {
      console.error('Error updating disease:', error);
      setErrorStatus('error');
      setErrorMessage('Error updating disease');
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCancel = () => {
    setEditableRow(null);
    setEditedSymptoms('');
    setEditedDrugNames('');
  };

  return (
    <div className='diseaseContainer'>
      <div className='heading'>All Diseases</div>

      <div className="button-container">
        <Link to="/add-disease">
          <button>Add Disease</button>
        </Link>
        <Link to="/add-medicine">
          <button>Add Medicine</button>
        </Link>
        <Link to="/view-medicine">
          <button>View Medicine</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Disease</th>
            <th>Symptoms</th>
            <th>Medicines</th>
            <th>Animal</th>
            <th>Mode</th>
            {/* <th>Modified At</th> */}
            <th style={{ minWidth: '100px' }}>Actions</th>


          </tr>
        </thead>
        <tbody>
          {diseases.map((disease, index) => (
            <tr key={index}>
              <td>{disease.diseaseName}</td>
              <td>
                {editableRow === disease._id ? (
                  <input
                    type="text"
                    className="editable-input"
                    value={editedSymptoms}
                    onChange={(e) => setEditedSymptoms(e.target.value)}
                  />
                ) : (
                  disease.diseaseSymptoms.join(', ')
                )}
              </td>
              <td>
                {editableRow === disease._id ? (
                  <input
                    type="text"
                    className="editable-input"
                    value={editedDrugNames}
                    onChange={(e) => setEditedDrugNames(e.target.value)}
                  />
                ) : (
                  disease.drugNames.join(', ')
                )}
              </td>
              <td>{disease.animalType}</td>
              <td>{disease.drugMode}</td>
              {/* <td>{new Date(disease.createdAt).toLocaleString()}</td> */}
              <td>
                {editableRow === disease._id ? (
                  <>
                    <button onClick={() => handleSave(disease._id)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button className='edit-btn' onClick={() => handleEdit(disease)}></button>
                )}
                <button className='del-btn' onClick={() => handleDelete(disease._id)}></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showError && <ErrorPopup type={errorStatus} message={errorMessage} onClose={handleCloseError} />}
    </div>
  );
}

export default ViewDiseases;
