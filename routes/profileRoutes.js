// Importing the express library and creating a new router instance.
// - express.Router() allows us to define profile-related routes in this file.
// - This modular approach organizes routes by resource (e.g., profile) and keeps our code clean and manageable.
const express = require('express');
const router = express.Router();

// Importing the profileController to handle the logic for each route defined below.
// - The controller manages the functionality for each route, such as creating, updating, or retrieving profiles.
// - By separating the logic into a controller, we maintain a clean separation between route definitions and business logic.
const profileController = require('../controllers/profileController');

// Defining routes for profile-related operations.
// Each route specifies an HTTP method, a URL pattern, and a corresponding controller function.
// For example, when a POST request is made to '/', the createProfile function in profileController is called.

router.post('/', profileController.createProfile);             // Create a profile
router.get('/:userId', profileController.getProfile);          // Get a profile by user ID
router.put('/:userId', profileController.updateProfile);       // Update a profile by user ID
router.delete('/:userId', profileController.deleteProfile);    // Delete a profile by user ID

// Exporting the router to make it available for use in the main server file (index.js).
// This export allows our application to handle requests for '/profiles' and pass them to these specific routes.
module.exports = router;
