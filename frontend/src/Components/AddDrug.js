import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorPopup from './PopUp';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/AddDrug.css';
import '../index.css';

const AddDrug = () => {
  const navigate = useNavigate();
  const [diseaseName, setDiseaseName] = useState([]);
  const [drugName, setDrugName] = useState('');
  const [drugDoseLowerLimit, setDrugDoseLowerLimit] = useState('');
  const [drugDoseUpperLimit, setDrugDoseUpperLimit] = useState('');
  const [drugUnit, setDrugUnit] = useState('');
  const [drugConc, setDrugConc] = useState([]);
  const [drugMode, setDrugMode] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [drugNote, setDrugNote] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);
  const [tempDrugConc, setTempDrugConc] = useState(''); // Temporary storage for individual drug concentrations

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        diseaseName.length > 0 &&
        drugName &&
        drugDoseLowerLimit &&
        drugDoseUpperLimit &&
        drugUnit &&
        drugConc.length > 0 &&
        drugMode &&
        animalType
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [diseaseName, drugName, drugDoseLowerLimit, drugDoseUpperLimit, drugUnit, drugConc, drugMode, animalType]);

  const handleAddDrugConc = () => {
    if (tempDrugConc) {
      setDrugConc([...drugConc, Number(tempDrugConc)]);
      setTempDrugConc(''); // Clear temporary input
    }
  };

  const handleDeleteDrugConc = (index) => {
    const updatedConc = drugConc.filter((_, i) => i !== index);
    setDrugConc(updatedConc);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDrug = {
      diseaseName,
      drugName,
      drugDoseLowerLimit: Number(drugDoseLowerLimit),
      drugDoseUpperLimit: Number(drugDoseUpperLimit),
      drugUnit,
      drugConc,
      drugMode,
      animalType,
      drugNote,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/drug/create`, newDrug, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setErrorStatus('success');
      setErrorMessage('Drug added successfully!');
      setShowError(true);
      navigate('/view-medicine');
    } catch (error) {
      setErrorStatus('error');
      setErrorMessage('Error adding drug');
      setShowError(true);
      console.error('Error:', error);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <div>
      <div className="heading">Add Drug</div>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Disease Name:</label>
          <input
            type="text"
            value={diseaseName.join(', ')}
            placeholder="Enter diseases separated by commas"
            onChange={(e) => setDiseaseName(e.target.value.split(',').map((name) => name.trim()))}
            required
          />
        </div>
        <div>
          <label>Drug Name:</label>
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Drug Dose Lower Limit:</label>
          <input
            type="number"
            value={drugDoseLowerLimit}
            onChange={(e) => setDrugDoseLowerLimit(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Drug Dose Upper Limit:</label>
          <input
            type="number"
            value={drugDoseUpperLimit}
            onChange={(e) => setDrugDoseUpperLimit(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Drug Unit:</label>
          <select
            value={drugUnit}
            onChange={(e) => setDrugUnit(e.target.value)}
            required
          >
            <option value="">Select Drug Unit</option>
            <option value="mg">mg</option>
            <option value="mcg">mcg</option>
            <option value="g">g</option>
            <option value="ml">ml</option>
            <option value="ul">ul</option>
          </select>
        </div>
        <div>
          <label>Drug Concentration:</label>
          <div>
            <input
              type="number"
              value={tempDrugConc}
              onChange={(e) => setTempDrugConc(e.target.value)}
            />
            <button type="button" onClick={handleAddDrugConc}>
              Add Concentration
            </button>
          </div>
          <ul>
            {drugConc.map((conc, index) => (
              <li key={index}>
                {conc}{' '}
                <button type="button" onClick={() => handleDeleteDrugConc(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
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
          <label>Doctor's Notes:</label>
          <textarea
            value={drugNote}
            rows="4"
            cols="60"
            placeholder="Enter notes here...(optional)"
            onChange={(e) => setDrugNote(e.target.value)}
          />
        </div>
        <button className="submit-button" type="submit" disabled={!isFormValid}>
          Add Drug
        </button>
      </form>
      {showError && <ErrorPopup type={errorStatus} message={errorMessage} onClose={handleCloseError} />}

      <div className="nav-button-container">
        <Link to="/add-disease">
          <button>Add Disease</button>
        </Link>
        <Link to="/view-disease">
          <button>View Disease</button>
        </Link>
        <Link to="/view-medicine">
          <button>View Medicine</button>
        </Link>
      </div>
    </div>
  );
};

export default AddDrug;
