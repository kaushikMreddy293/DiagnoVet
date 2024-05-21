import Drug from '../models/drug.js'


// Create a dosage info using mongoose function
export const drugCreate = async (dosageData) => {
    const newDrug = new Drug(dosageData); // Create a new user instance with the provided data
    return await newDrug.save(); // Save the new user to the database
};

// Get all dosage info using mongoose function
export const drugGetAll = async (params = {}) => {
    const drugs = await Drug.find(params).exec(); // Find all users matching the provided parameters
    return drugs; // Return the found users
};

// Get a drug by ID using mongoose function
export const drugGetById = async (id) => {
    return await Drug.findById(id).exec(); // Find a user by their ID
};

//Delete a drug by ID using mongoose function
export const drugDelete = async (id) => {
    return await Drug.findByIdAndDelete(id).exec(); // Find and delete a user by their ID
};

//Update a drug using Mongoose function
export const drugUpdate = async (id, updatedDrug) => {
    const drug = await Drug.findByIdAndUpdate(id, updatedDrug).exec();
    return drug;
}