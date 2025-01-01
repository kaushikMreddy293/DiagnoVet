import React, { useState, useEffect } from 'react';
// import '../Styles/ViewDiseases.css';
import '../index.css';
import ErrorPopup from '../Components/PopUp.js';
import '../Styles/searchDiseases.css'

const SearchDiseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      setErrorStatus('error');
      setErrorMessage('Error fetching diseases');
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

//   const filteredDiseases = diseases.filter(disease =>
//     disease.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     disease.diseaseSymptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
//   );



  const filteredDiseases = diseases.filter(disease => {
    const searchTerms = searchTerm
      .split(',')
      .map(term => term.trim().toLowerCase());
    return searchTerms.every(term =>
      disease.diseaseName.toLowerCase().includes(term) ||
      disease.diseaseSymptoms.some(symptom =>
        symptom.toLowerCase().includes(term)
      )
    );
  });

  

  return (
    <div className='diseaseContainer'>
      <div className='heading'>Search for Diseases By matching Symptoms</div>
      <div className='search-container'>
      <input
        type="text"
        placeholder="Search by disease name or symptoms (comma separated)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-bar'
      />
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
          </tr>
        </thead>
        <tbody>
          {filteredDiseases.map((disease, index) => (
            <tr key={index}>
              <td>{disease.diseaseName}</td>
              <td>
                {disease.diseaseSymptoms
                  .flatMap(symptoms => symptoms.split(','))
                  .map(symptom => symptom.trim())
                  .sort()
                  .join(', ')}
              </td>
              <td>{disease.drugNames.join(', ')}</td>
              <td>{disease.animalType}</td>
              <td>{disease.drugMode}</td>
              {/* <td>{new Date(disease.createdAt).toLocaleString()}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {showError && <ErrorPopup type={errorStatus} message={errorMessage} onClose={handleCloseError} />}
    </div>
  );
}

export default SearchDiseases;
