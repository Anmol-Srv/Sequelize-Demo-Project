// Importing the express library and creating a new router instance.
// - express.Router() allows us to define routes specifically for managing tags associated with posts in this file.
// - This modular approach keeps our route definitions organized and easy to maintain, especially as the application grows.
const express = require('express');
const router = express.Router();

// Importing the postTagController to handle the logic for each route defined below.
// - A controller manages the functionality of each route, such as adding or removing tags from posts.
// - By separating the logic into a controller file, we keep our routes clean and focused on defining the paths.
const postTagController = require('../controllers/postTagController');

// Defining the routes for managing the association between posts and tags.
// Each route specifies an HTTP method, a URL pattern, and a corresponding controller function.
// For example, when a POST request is made to '/:postId/tags', the addTagToPost function in postTagController is called.

router.post('/:postId/tags', postTagController.addTagToPost);         // Add a tag to a post
router.delete('/:postId/tags', postTagController.removeTagFromPost);  // Remove a tag from a post

// Exporting the router to make it available for use in the main server file (index.js).
// This export allows our application to handle requests for '/posts/:postId/tags' and pass them to these specific routes.
module.exports = router;
