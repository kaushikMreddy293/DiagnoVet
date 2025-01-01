import React, { useState, useEffect } from 'react';
import '../Styles/ViewDrugs.css';
import { Link } from 'react-router-dom';
import '../index.css';
import ErrorPopup from '../Components/PopUp.js';

const ViewDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  const [editedDiseaseNames, setEditedDiseaseNames] = useState('');
  const [editableNotes, setEditableNotes] = useState('');
  const [originalDiseaseNames, setOriginalDiseaseNames] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleRowClick = (id, notes) => {
    if (expandedRow === id) {
      setExpandedRow(null);
      setEditableNotes('');
    } else {
      setExpandedRow(id);
      setEditableNotes(notes);
    }
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
      fetchDrugs();
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
    setEditableNotes(drug.notes);
  };

  const handleSave = async (id) => {
    const drugToUpdate = drugs.find((drug) => drug._id === id);
    const updatedDrug = {
      ...drugToUpdate,
      diseaseName: editedDiseaseNames.split(',').map((name) => name.trim()),
      drugNote: editableNotes
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
      fetchDrugs();
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
    setEditedDiseaseNames(originalDiseaseNames);
  };

  // Filter and sort drugs
  const filteredDrugs = drugs
    .filter((drug) =>
      drug.drugName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.drugName.localeCompare(b.drugName));

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
      {/* Search bar */}
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search by drug name...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='search-bar'
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Diseases</th>
            <th>Dose Range</th>
            <th>Unit</th>
            <th>Concentrations</th>
            <th>Mode</th>
            <th>Animal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDrugs.map((drug, index) => (
            <React.Fragment key={drug._id}>
              <tr key={index} onClick={() => handleRowClick(drug._id, drug.drugNote)}>
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
                    <td>{`${drug.drugDoseLowerLimit} - ${drug.drugDoseUpperLimit}`}</td>
                    <td>{drug.drugUnit}</td>
                    <td>{drug.drugConc.toLocaleString()}</td>
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
                    <td>{`${drug.drugDoseLowerLimit} - ${drug.drugDoseUpperLimit}`}</td>
                    <td>{drug.drugUnit}</td>
                    <td>{drug.drugConc.toLocaleString()}</td>
                    <td>{drug.drugMode}</td>
                    <td>{drug.animalType}</td>
                    <td>
                      <button className='edit-btn' onClick={() => handleEdit(drug)}></button>
                      <button className='del-btn' onClick={() => handleDelete(drug._id)}></button>
                    </td>
                  </>
                )}
              </tr>
              {expandedRow === drug._id && (
                <tr>
                  <td colSpan='8'>
                    <div className='expanded-content'>
                      <div>
                        <label>Doctor's Notes:</label>
                        {editableRow === drug._id ? (
                          <textarea
                            value={editableNotes}
                            onChange={(e) => setEditableNotes(e.target.value)}
                            className='editable-input'
                          />
                        ) : (
                          <p>{editableNotes}</p>
                        )}
                      </div>
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

export default ViewDrugs;
