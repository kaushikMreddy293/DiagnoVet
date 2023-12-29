import Diagnosis from '../models/diagnosis.js'

//save diagnostic report with mongoose function
export const saveDiagnosticReport = async(report) => {
    const diagnosis = new Diagnosis(report);
    console.log(report);
    return await diagnosis.save();
}

//get all diagnostic reports with mongoose function
export const getAllDiagnosticReports = async(params = {}) => {
    const reports = await Diagnosis.find(params).exec();
    return reports;
}
 
//delete a diagnostic report based on ID with mongoose function
export const deleteDiagnosticReport = async(id) => {
    return await Diagnosis.findByIdAndDelete(id).exec();
}

//Update a diagnostic report with mongoose function
export const updateDiagnosticReport = async (updatedReport, id) => {
    const report = await Diagnosis.findByIdAndUpdate(id, updatedReport).exec();
    return report;
}

//fetch diagnostic report by ID with mongoose function
export const getDiagnosticReportById = async(id) => {
    const report = await Diagnosis.findById(id).exec();
    return report;
}
