import * as userService from '../services/user-service.js';
import {successResponse, errorResponse, deleteResponse, updateResponse} from './response-handler.js'

const successMsg = "User Created Successfully";
const deleteMsg = "User Deleted Successfully";
const updateMsg = "User Updated Successfully";


//To save new user
export const saveUser = async (request, response) => {

    try {
        const newUser = {...request.body}
        const user = await userService.userCreate(newUser);
        successResponse(successMsg, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To get all users
export const getAllUsers = async (request, response) => {

    try {
        const params = {...request.query};
        const users = await userService.userGetAll(params);
        successResponse(users, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To get user by ID
export const getUserbyID = async (request, response) => {

    try {
      //  const params = {...request.query};
        const id = request.params.id;
        const user = await userService.userGetById(id);
        successResponse(user, response);
    } catch (error) {
        errorResponse(error, response);
    }
}

//To delete user by Id
export const deleteUser = async (request, response) => {

    try {
        const id = request.params.id;
        const user = await userService.userDelete(id);
        deleteResponse(deleteMsg, response);
    } catch (error) {
        errorResponse(error,response);
    }
}

//To update a user
export const updateUser = async (request, response) =>{
    try {
        const id = request.params.id;
        const updatedUser= {...request.body};
        const user = await userService.userUpdate(updatedUser, id);
        updateResponse(updateMsg, response);
    } catch (err){
        errorResponse(err, response)
    }
}