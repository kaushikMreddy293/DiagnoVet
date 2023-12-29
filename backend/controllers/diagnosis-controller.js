import { request, response } from 'express'
import * as diagnosticService from '../services/diagnosis-service.js'
import {successResponse, errorResponse, deleteResponse, updateResponse} from './response-handler.js'

const reportAddedMessage = "Data Created Successfully.";
const reportDeletedMessage = "Data Deleted Successfully."
const reportUpdatedMessage = "Data Updated Successfully."

//To save new report
export const postDiagnosticReport = async (request, response) => {

    try {
        const newReport = {...request.body}
        const report = await diagnosticService.saveDiagnosticReport(newReport);
        successResponse(reportAddedMessage, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To get all reports
export const getAllDiagnosticReports = async (request, response) => {

    try {
        const params = {...request.query};
        const reports = await diagnosticService.getAllDiagnosticReports(params);
        successResponse(reports, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To get report by ID
export const getDiagnosticReportByID = async (request, response) => {

    try {
      //  const params = {...request.query};
        const id = request.params.id;
        const report = await diagnosticService.getDiagnosticReportByID(id);
        successResponse(report, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To delete report by Id
export const deleteDiagnosticReport = async (request, response) => {

    try {
        const id = request.params.id;
        const report = await diagnosticService.deleteDiagnosticReport(id);
        deleteResponse(reportDeletedMessage, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

//To update a diagnostic report
export const updateDiagnosticReport = async (request, response) =>{
    try {
        const id = request.params.id;
        const updatedReport= {...request.body};
        const report = await diagnosticService.updateDiagnosticReport(updatedReport, id);
        updateResponse(reportUpdatedMessage, response);
    } catch (err){
        errorResponse(err, response)
    }
}