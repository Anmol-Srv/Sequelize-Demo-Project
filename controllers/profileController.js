// Importing the Profile and User models to interact with their respective tables in the database.
// - Profile represents additional user information, linked in a one-to-one relationship with User.
// - User represents individual users, who may each have one profile.
const { Profile, User } = require('../models');

// Create a profile for a user
// This function allows the creation of a profile associated with a specific user.
exports.createProfile = async (req, res) => {
    try {
        const { bio, userId } = req.body;  // Destructure bio and userId from the request body

        // Find the user by their primary key (userId) to ensure the user exists before creating a profile.
        const user = await User.findByPk(userId);
        if (!user) {
            // If the user is not found, return a 404 error message.
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the profile associated with the user by using the userId as a foreign key.
        const profile = await Profile.create({ bio, userId });

        // Return the newly created profile with a 201 status to indicate successful creation.
        res.status(201).json(profile);
    } catch (error) {
        // If an error occurs, return a 400 status and the error message.
        res.status(400).json({ error: error.message });
    }
};

// Get a user's profile
// This function retrieves the profile for a specific user, along with the associated user details.
exports.getProfile = async (req, res) => {
    try {
        // Find the profile by matching the userId, and include the User model to retrieve user information.
        const profile = await Profile.findOne({
            where: { userId: req.params.userId },
            include: [User]
        });

        // If no profile is found, return a 404 error message.
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Return the profile data with a 200 status to indicate successful retrieval.
        res.status(200).json(profile);
    } catch (error) {
        // If an error occurs, return a 500 status and the error message.
        res.status(500).json({ error: error.message });
    }
};

// Update a user's profile
// This function updates the profile for a specific user, modifying fields such as bio.
exports.updateProfile = async (req, res) => {
    try {
        const { bio } = req.body;  // Destructure the bio from the request body

        // Update the profile where the userId matches, using the new bio.
        const [updated] = await Profile.update({ bio }, {
            where: { userId: req.params.userId }
        });

        if (updated) {
            // If the profile was updated, retrieve the updated profile to confirm changes.
            const updatedProfile = await Profile.findOne({ where: { userId: req.params.userId } });
            res.status(200).json(updatedProfile);
        } else {
            // If no profile was found to update, return a 404 error.
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        // If an error occurs, return a 400 status and the error message.
        res.status(400).json({ error: error.message });
    }
};

// Delete a user's profile
// This function deletes the profile for a specific user.
exports.deleteProfile = async (req, res) => {
    try {
        // Delete the profile where the userId matches the specified parameter.
        const deleted = await Profile.destroy({
            where: { userId: req.params.userId }
        });

        if (deleted) {
            // If deletion is successful, return a 204 (No Content) status.
            res.status(204).send();
        } else {
            // If no profile was found to delete, return a 404 error.
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        // If an error occurs, return a 500 status and the error message.
        res.status(500).json({ error: error.message });
    }
};
