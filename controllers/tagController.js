// Importing the Tag model to interact with the tags table in the database.
// - Tag represents a category or label that can be associated with multiple posts.
const { Tag } = require('../models');

// Create a new tag
// This function allows the creation of a new tag, which can be associated with posts for categorization.
exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;  // Destructure the name of the tag from the request body

        // Create the tag in the database with the provided name.
        const tag = await Tag.create({ name });

        // Return the newly created tag with a 201 status to indicate successful creation.
        res.status(201).json(tag);
    } catch (error) {
        // If an error occurs, return a 400 status with the error message.
        res.status(400).json({ error: error.message });
    }
};

// Get all tags
// This function retrieves all tags in the database, which can be used for tagging posts.
exports.getAllTags = async (req, res) => {
    try {
        // Find all tags using the findAll method, which returns an array of tags.
        const tags = await Tag.findAll();

        // Return the list of tags with a 200 status to indicate successful retrieval.
        res.status(200).json(tags);
    } catch (error) {
        // If an error occurs, return a 500 status with the error message.
        res.status(500).json({ error: error.message });
    }
};

// Update a tag
// This function updates a tag's name, allowing administrators to correct or modify tag names.
exports.updateTag = async (req, res) => {
    try {
        const { name } = req.body;  // Destructure the name from the request body

        // Update the tag's name where the id matches the specified parameter.
        // - The `update` method returns an array where the first element is the number of affected rows.
        const [updated] = await Tag.update({ name }, { where: { id: req.params.id } });

        if (updated) {
            // If the update was successful, retrieve the updated tag to confirm changes.
            const updatedTag = await Tag.findByPk(req.params.id);
            res.status(200).json(updatedTag);
        } else {
            // If no tag was found to update, return a 404 error message.
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        // If an error occurs, return a 400 status with the error message.
        res.status(400).json({ error: error.message });
    }
};

// Delete a tag
// This function deletes a tag by its ID, which is useful for removing obsolete or irrelevant tags.
exports.deleteTag = async (req, res) => {
    try {
        // Delete the tag with the specified ID from the database.
        const deleted = await Tag.destroy({ where: { id: req.params.id } });

        if (deleted) {
            // If deletion is successful, return a 204 status (No Content).
            res.status(204).send();
        } else {
            // If no tag was found to delete, return a 404 error message.
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        // If an error occurs, return a 500 status with the error message.
        res.status(500).json({ error: error.message });
    }
};
