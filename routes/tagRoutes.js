// Importing the express library and creating a new router instance.
// - express.Router() allows us to define routes related to tags in this file.
// - This modular approach keeps the code organized by grouping tag-related routes together.
const express = require('express');
const router = express.Router();

// Importing the tagController to handle the logic for each route defined below.
// - The controller manages the functionality for each route, such as creating, retrieving, updating, or deleting tags.
// - By using a controller, we keep the route definitions clean and the logic separate.
const tagController = require('../controllers/tagController');

// Defining routes for tag-related operations.
// Each route specifies an HTTP method, a URL pattern, and a corresponding controller function.
// For example, when a POST request is made to '/', the createTag function in tagController is called.

router.post('/', tagController.createTag);              // Create a new tag
router.get('/', tagController.getAllTags);              // Get all tags
router.put('/:id', tagController.updateTag);            // Update tag by ID
router.delete('/:id', tagController.deleteTag);         // Delete tag by ID

// Exporting the router to make it available for use in the main server file (index.js).
// This export allows our application to handle requests for '/tags' and pass them to these specific routes.
module.exports = router;
