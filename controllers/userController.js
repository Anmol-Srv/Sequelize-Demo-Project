// Importing the User, Profile, and Post models to interact with their respective tables in the database.
// - User represents individuals with accounts in the application.
// - Profile provides additional information about the user.
// - Post represents content created by users and associated with their accounts.
const { User, Profile, Post } = require('../models');

// Create a new user
// This function allows for the creation of a new user with basic details.
exports.createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;  // Destructure user information from the request body

        // Create the user in the database with the provided first name, last name, and email.
        const user = await User.create({ firstName, lastName, email });

        // Return the newly created user with a 201 status to indicate successful creation.
        res.status(201).json(user);
    } catch (error) {
        // If an error occurs, return a 400 status and the error message.
        res.status(400).json({ error: error.message });
    }
};

// Get all users
// This function retrieves all users in the database.
exports.getAllUsers = async (req, res) => {
    try {
        // Find all users using the findAll method, which returns an array of users.
        const users = await User.findAll();

        // Return the list of users with a 200 status to indicate successful retrieval.
        res.status(200).json(users);
    } catch (error) {
        // If an error occurs, return a 500 status and the error message.
        res.status(500).json({ error: error.message });
    }
};

// Get user by ID and include associated profile and posts
// This function retrieves a specific user by ID and includes their profile and posts.
exports.getUserById = async (req, res) => {
    try {
        // Find the user by primary key (ID) and include Profile and Post associations.
        // - This allows for fetching a user along with their profile information and any posts they have created.
        const user = await User.findByPk(req.params.id, {
            include: [Profile, Post]   // Include Profile and Post associations for detailed user information
        });

        if (user) {
            // If the user exists, return their data with a 200 status.
            res.status(200).json(user);
        } else {
            // If no user is found with the specified ID, return a 404 error.
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // If an error occurs, return a 500 status and the error message.
        res.status(500).json({ error: error.message });
    }
};

// Update a user
// This function updates user information, such as their name and email.
exports.updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;  // Destructure user information from the request body

        // Update the user details where the ID matches the specified parameter.
        // - The `update` method returns an array where the first element is the number of affected rows.
        const [updated] = await User.update({ firstName, lastName, email }, {
            where: { id: req.params.id }
        });

        if (updated) {
            // If the update was successful, retrieve the updated user to confirm changes.
            const updatedUser = await User.findByPk(req.params.id);
            res.status(200).json(updatedUser);
        } else {
            // If no user was found to update, return a 404 error.
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // If an error occurs, return a 500 status and the error message.
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
// This function deletes a user by their ID.
exports.deleteUser = async (req, res) => {
    try {
        // Delete the user where the ID matches the specified parameter.
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            // If deletion is successful, return a 204 status (No Content).
            res.status(204).send();
        } else {
            // If no user was found to delete, return a 404 error.
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // If an error occurs, return a 500 status and the error message.
        res.status(500).json({ error: error.message });
    }
};
