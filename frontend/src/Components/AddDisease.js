import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AddDisease.css'; // Import your form CSS file
import ErrorPopup from './PopUp';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddDisease = () => {
    const navigate = useNavigate();
  const [animalType, setAnimalType] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [diseaseSymptoms, setDiseaseSymptoms] = useState('');
  const [drugMode, setDrugMode] = useState('');
  const [drugNames, setDrugNames] = useState('');
  // const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        animalType &&
        diseaseName &&
        diseaseSymptoms &&
        drugMode &&
        drugNames
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [animalType, diseaseName, diseaseSymptoms, drugMode, drugNames]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const symptomsArray = diseaseSymptoms.split(',').map(symptom => symptom.trim());
    const drugsArray = drugNames.split(',').map(drug => drug.trim());

    const newDisease = {
      animalType,
      diseaseName,
      diseaseSymptoms: symptomsArray,
      drugMode,
      drugNames: drugsArray,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/diagnosis/create`, newDisease, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setErrorStatus('success');
      setErrorMessage('Disease added successfully!');
      setShowError(true)
      navigate('/view-disease');
      //setMessage('Disease added successfully!');
      //console.log('Response:', response.data);
    } catch (error) {
        setErrorStatus('error');
      setErrorMessage('Error adding disease');
      setShowError(true)
      //setMessage('Error adding disease.');
      console.error('Error:', error);
    }

    
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <div>
      <div className='heading'>Add A New Disease</div>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Animal Type:</label>
          <select
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            required
          >
            <option value="">Select Animal Type</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
          </select>
        </div>
        <div>
          <label>Disease Name:</label>
          <input
            type="text"
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Disease Symptoms (comma separated):</label>
          <input
            type="text"
            value={diseaseSymptoms}
            onChange={(e) => setDiseaseSymptoms(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Drug Mode:</label>
          <select
            value={drugMode}
            onChange={(e) => setDrugMode(e.target.value)}
            required
          >
            <option value="">Select Drug Mode</option>
            <option value="Tablet">Tablet</option>
            <option value="Injection">Injection</option>
          </select>
        </div>
        <div>
          <label>Drug Names (comma separated):</label>
          <input
            type="text"
            value={drugNames}
            onChange={(e) => setDrugNames(e.target.value)}
            required
          />
        </div>
        <button className='submit-button' type="submit" disabled={!isFormValid}>Add Disease</button>
      </form>
      {/* {message && <p>{message}</p>} */}
      {showError && <ErrorPopup type={errorStatus} message={errorMessage} onClose={handleCloseError} />}
      <div className="nav-button-container"> {/* Add a class to the container */}
            {/* <Link to="/add-disease">
              <button>Add Disease</button>
            </Link> */}
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
    </div>
  );
};

export default AddDisease;
