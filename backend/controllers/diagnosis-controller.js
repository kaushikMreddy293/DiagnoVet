import { request, response } from 'express'
import * as diagnosticService from '../services/diagnosis-service.js'
import {successResponse, errorResponse, deleteResponse, updateResponse} from './response-handler.js'

const reportAddedMessage = "Disease Added Successfully.";
const reportDeletedMessage = "Disease Deleted Successfully."
const reportUpdatedMessage = "Disease Updated Successfully."

//To save new report
export const save = async (request, response) => {

    try {
        const newReport = {...request.body}
        const report = await diagnosticService.saveDiagnosticReport(newReport);
        successResponse(reportAddedMessage, response);
    } catch (error) {
        if (error.code === 11000) { // 11000 is the error code for duplicate key error in MongoDB
            console.error('Duplicate diseaseName error:', error.message);
            errorResponse(error, response);
        } else {
            //console.error('Error adding diagnosis:', error);
            errorResponse(error, response);
        }  
        
    }
}

//To get all reports
export const getAll = async (request, response) => {

    try {
        const params = {...request.query};
        const reports = await diagnosticService.getAllDiagnosticReports(params);
        successResponse(reports, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To get report by ID
export const getById = async (request, response) => {

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
export const remove = async (request, response) => {

    try {
        const id = request.params.id;
        const report = await diagnosticService.deleteDiagnosticReport(id);
        deleteResponse(reportDeletedMessage, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

//To update a diagnostic report
export const update = async (request, response) =>{
    try {
        const id = request.params.id;
        const updatedReport= {...request.body};
        console.log(updatedReport)
        const report = await diagnosticService.updateDiagnosticReport(id, updatedReport);
        updateResponse(reportUpdatedMessage, response);
    } catch (err){
        errorResponse(err, response)
    }
}