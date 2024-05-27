import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import ErrorPopup from './PopUp';
import { useNavigate , Link} from 'react-router-dom';
import '../Styles/AddDrug.css';
import '../index.css'

const AddDrug = () => {
  const navigate = useNavigate();
  const [diseaseName, setDiseaseName] = useState('');
  const [drugName, setDrugName] = useState('');
  const [drugDosage, setDrugDosage] = useState('');
  const [drugUnit, setDrugUnit] = useState('');
  const [drugMode, setDrugMode] = useState('');
  const [animalType, setAnimalType] = useState('');
  // const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const checkFormValidity = () => {
      if (
        diseaseName &&
        drugName &&
        drugDosage &&
        drugUnit &&
        drugMode &&
        animalType
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };
  
    checkFormValidity();
  }, [diseaseName, drugName, drugDosage, drugUnit, drugMode, animalType]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDrug = {
      diseaseName: [diseaseName],
      drugName,
      drugDosage: Number(drugDosage),
      drugUnit,
      drugMode,
      animalType,
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

    navigate('/view-medicine');
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <div>
      <div className='heading'>Add Drug</div>
      <form onSubmit={handleSubmit} className="form-container">
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
          <label>Drug Name:</label>
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Drug Dosage:</label>
          <input
            type="number"
            value={drugDosage}
            onChange={(e) => setDrugDosage(e.target.value)}
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
        <button className='submit-button' type="submit" disabled={!isFormValid}>Add Drug</button>
      </form>
      {/* {message && <p>{message}</p>} */}
      {showError && <ErrorPopup type={errorStatus} message={errorMessage} onClose={handleCloseError} />}

      <div className="button-container"> {/* Add a class to the container */}
            <Link to="/add-disease">
              <button>Add Disease</button>
            </Link>
            <Link to="/view-disease">
              <button>View Disease</button>
            </Link>
            {/* <Link to="/add-medicine">
              <button>Add Medicine</button>
            </Link> */}
            <Link to="/view-medicine">
              <button>View Medicine</button>
            </Link>
          </div>
    </div>
  );
};

export default AddDrug;
