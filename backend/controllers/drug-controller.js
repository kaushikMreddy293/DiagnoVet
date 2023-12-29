import * as drugService from '../services/drug-service.js';
import {successResponse, errorResponse, deleteResponse, updateResponse} from './response-handler.js'

const successMsg = "Drug Created Successfully";
const deleteMsg = "Drug Deleted Successfully";
const updateMsg = "Drug Updated Successfully";


//To save new drug
export const save = async (request, response) => {

    try {
        const newDrug = {...request.body}
        const drug = await drugService.drugCreate(newDrug);
        successResponse(successMsg, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To get all drugs
export const getAll = async (request, response) => {

    try {
        const params = {...request.query};
        const drugs = await drugService.drugGetAll(params);
        successResponse(drugs, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To get drug by ID
export const getById = async (request, response) => {

    try {
      //  const params = {...request.query};
        const id = request.params.id;
        const drug = await drugService.drugGetById(id);
        successResponse(drug, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To delete drug by Id
export const remove = async (request, response) => {

    try {
        const id = request.params.id;
        const drug = await drugService.drugDelete(id);
        deleteResponse(deleteMsg, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

//To update a drug info
export const update = async (request, response) =>{
    try {
        const id = request.params.id;
        const updatedDrug= {...request.body};
        const drug = await drugService.drugUpdate(updatedDrug, id);
        updateResponse(updateMsg, response);
    } catch (err){
        errorResponse(err, response)
    }
}