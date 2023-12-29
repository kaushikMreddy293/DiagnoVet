import User from '../models/user.js'

// Create a user using mongoose function
export const userCreate = async (userData) => {
    const newUser = new User(userData); // Create a new user instance with the provided data
    return await newUser.save(); // Save the new user to the database
};

// Get all users using mongoose function
export const userGetAll = async (params = {}) => {
    const users = await User.find(params).exec(); // Find all users matching the provided parameters
    return users; // Return the found users
};

// Get a user by ID using mongoose function
export const userGetById = async (id) => {
    return await User.findById(id).exec(); // Find a user by their ID
};

//Delete a user by ID using mongoose function
export const userDelete = async (id) => {
    return await User.findByIdAndDelete(id).exec(); // Find and delete a user by their ID
};

//Update a user using Mongoose function
export const userUpdate = async (id, updatedUser) => {
    const user = await User.findByIdAndUpdate(id, updatedUser).exec();
    return user;
}