// Importing the express library and creating a new router instance.
// - express.Router() allows us to define routes related to users in this file.
// - This modular approach organizes the routes by resource, making the codebase more manageable as the application grows.
const express = require('express');
const router = express.Router();

// Importing the userController to handle the logic for each route defined below.
// - The controller manages the functionality for each route, such as creating, retrieving, updating, or deleting users.
// - By using a controller, we keep the route definitions clean, with the business logic in a separate file.
const userController = require('../controllers/userController');

// Defining routes for user-related operations.
// Each route specifies an HTTP method, a URL pattern, and a corresponding controller function.
// For example, when a POST request is made to '/', the createUser function in userController is called.

router.post('/', userController.createUser);           // Create a new user
router.get('/', userController.getAllUsers);           // Get all users
router.get('/:id', userController.getUserById);        // Get user by ID
router.put('/:id', userController.updateUser);         // Update user by ID
router.delete('/:id', userController.deleteUser);      // Delete user by ID

// Exporting the router to make it available for use in the main server file (index.js).
// This export allows our application to handle requests for '/users' and pass them to these specific routes.
module.exports = router;
