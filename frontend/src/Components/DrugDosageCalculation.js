import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../Styles/DrugDosageCalculation.css';

const DrugDosageCalculation = () => {
  const { drugId } = useParams();
  const [drug, setDrug] = useState(null);
  const [chosenDose, setChosenDose] = useState('');
  const [weight, setWeight] = useState('');
  const [adminSold, setAdminSold] = useState('');
  const [noOfDosesPerDay, setNoOfDosesPerDay] = useState('');
  const [totalDuration, setTotalDuration] = useState('');

  const [doseByWeight, setDoseByWeight] = useState(null);
  const [tabPerDose, setTabPerDose] = useState(null);
  const [totalTabPerDay, setTotalTabPerDay] = useState(null);
  const [totalAmountToBuy, setTotalAmountToBuy] = useState(null);
  const [weightInKg, setWeightInKg] = useState('');  // Store weight in kg


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/drug/fetch/${drugId}`)
      .then((response) => response.json())
      .then((data) => {
        setDrug(data);
        // Assuming DrugConc is an array and setting it as options in the select
        if (data.DrugConc && data.DrugConc.length > 0) {
          setAdminSold('');  // Default to the first value
        }
      })

      .catch((error) => console.error('Error fetching drug:', error));
  }, [drugId]);

  useEffect(() => {
    // Calculate values dynamically as inputs change
    if (chosenDose && weightInKg) {
      const doseWeight = (chosenDose * weightInKg).toFixed(2);
      setDoseByWeight(doseWeight);

      if (adminSold) {
        const tabsPerDose = (doseWeight / adminSold).toFixed(2);
        setTabPerDose(tabsPerDose);

        if (noOfDosesPerDay) {
          const totalTabsPerDay = (tabsPerDose * noOfDosesPerDay).toFixed(2);
          setTotalTabPerDay(totalTabsPerDay);

          if (totalDuration) {
            const totalToBuy = (totalTabsPerDay * totalDuration).toFixed(2);
            setTotalAmountToBuy(totalToBuy);
          } else {
            setTotalAmountToBuy(null);
          }
        } else {
          setTotalTabPerDay(null);
          setTotalAmountToBuy(null);
        }
      } else {
        setTabPerDose(null);
        setTotalTabPerDay(null);
        setTotalAmountToBuy(null);
      }
    } else {
      setDoseByWeight(null);
      setTabPerDose(null);
      setTotalTabPerDay(null);
      setTotalAmountToBuy(null);
    }
  }, [chosenDose, weight, adminSold, noOfDosesPerDay, totalDuration]);

  return (
    <div className="dosage-container-calc">
      <h3>Dosage Calculation for {drug?.drugName}</h3>
      <Link to="/search-drug">
        <button>Back to Drugs List</button>
      </Link>
      {drug && (
        <div className="dosage-content">



          {/* Editable and viewing fields */}
          <div className="right-section">
            <div>
              <label>Chosen Dose ({drug.drugUnit}):</label>
              <input
                type="number"
                value={chosenDose}
                onChange={(e) => setChosenDose(e.target.value)}
                placeholder="Enter chosen dose"
              />
            </div>
            <div>
            <label>Weight of Patient (lbs):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => {
                  const weightInLbs = e.target.value;
                  setWeight(weightInLbs); // Store weight in lbs
                  const weightInKg = (weightInLbs * 0.453592).toFixed(2); // Convert lbs to kg
                  setWeightInKg(weightInKg); // Store weight in kg for calculations
  
                }}
                placeholder="Enter weight in lbs"
              />
               
      

            </div>
            {/* {doseByWeight && (
              <div>
                <label><strong>Dose by Weight:</strong> {doseByWeight} {drug.drugUnit}</label>
              </div>
            )} */}
            {/* <div>
              <label>Administration Sold (mg/ml or equivalent):</label>
              <input
                type="number"
                value={adminSold}
                onChange={(e) => setAdminSold(e.target.value)}
                placeholder="Enter drug concentration"
              />
            </div> */}
            <div>
              <label>Administration Sold (mg/ml or mg):</label>
              <select
                value={adminSold}
                onChange={(e) => setAdminSold(e.target.value)} // Update adminSold based on selection
              >
                 <option value="" disabled>Select concentration</option>  {/* Prompt for selection */}
  
                {drug?.drugConc?.map((conc, index) => (
                  <option key={index} value={conc}>
                    {conc}
                  </option>
                ))}
              </select>
            </div>


            {/* {tabPerDose && (
              <div>
                <label><strong>Tab/Fluid to be Given per Dose:</strong> {tabPerDose} {drug.drugUnit} </label>
              </div>
            )} */}
            <div>
              <label>No of Doses to be Taken per Day:</label>
              <input
                type="number"
                value={noOfDosesPerDay}
                onChange={(e) => setNoOfDosesPerDay(e.target.value)}
                placeholder="Enter doses per day"
              />
            </div>
            {/* {totalTabPerDay && (
              <div>
                <label><strong>Total Tab/Fluid per Day:</strong> {totalTabPerDay} {drug.drugUnit}</label>
              </div>
            )} */}
            <div>
              <label>Total Duration (days):</label>
              <input
                type="number"
                value={totalDuration}
                onChange={(e) => setTotalDuration(e.target.value)}
                placeholder="Enter total duration in days"
              />
            </div>
            {/* {totalAmountToBuy && (
              <div>
                <label><strong>Total Amount of Tablets/Fluid to Buy:</strong> {totalAmountToBuy} {drug.drugUnit}</label>
              </div>
            )} */}
          </div>


          {/* Non-editable fields */}
          <div className="left-section">
            <div>
              <label><strong>Drug Name:</strong> {drug.drugName}</label>
            </div>
            <div>
              <label><strong>Mode of Administration:</strong> {drug.drugMode}</label>
            </div>
            <div>
              <label><strong>Dose Range:</strong> {drug.drugDoseLowerLimit} - {drug.drugDoseUpperLimit} {drug.drugUnit}</label>
            </div>
            <div>
              <label><strong>Doctor's Notes: </strong> {drug.drugNote} </label>
              </div>
              <div>
              {weightInKg && (
                <div>
                  <label><strong>Weight of Patient (kg):</strong> {weightInKg} kg</label>
                </div>
              )}
              </div>

              <div>
          {doseByWeight && (
              <div>
                <label><strong>Total Dose by Weight:</strong> {doseByWeight} {drug.drugUnit}</label>
              </div>
            )}
          </div>
          {/* <div>
          {tabPerDose && (
              <div>
                <label><strong>Tab/Fluid to be Given per Dose:</strong> {tabPerDose} {drug.drugUnit} </label>
              </div>
            )}
          </div> */}
          <div>
          {totalTabPerDay && (
              <div>
                <label><strong>Total No of Tablets / Volume per Day:</strong> {totalTabPerDay} </label>
              </div>
            )}
          </div>
          <div>
          {totalAmountToBuy && (
              <div>
                <label><strong>Total Medication to be Dispensed:</strong> {totalAmountToBuy}</label>
              </div>
            )}
          </div>

          </div>
          
          
  
        </div>
      )}
    </div>
  );
}
  
export default DrugDosageCalculation;
