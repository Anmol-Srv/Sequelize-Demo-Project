// Importing the express library and creating a new router instance.
// - express.Router() allows us to define routes separately for each resource (like posts) in its own file.
// - This modular approach keeps our code organized and maintainable, especially in larger applications.
const express = require('express');
const router = express.Router();

// Importing the postController to handle requests for each route defined below.
// - A controller manages the actual functionality of each route, such as creating, reading, updating, or deleting data.
// - This separation keeps route definitions clean by placing the logic in a separate file (controller).
const postController = require('../controllers/postController');

// Defining the routes for post-related operations.
// Each route specifies an HTTP method and a URL pattern, mapping to a corresponding controller function.
// For example, when a POST request is made to '/', the createPost function in postController is called.

router.post('/', postController.createPost);              // Create a new post
router.get('/', postController.getAllPosts);              // Get all posts with pagination and status filtering
router.get('/:id', postController.getPostById);           // Get post by ID
router.put('/:id', postController.updatePost);            // Update post by ID
router.delete('/:id', postController.deletePost);         // Delete post by ID

// Exporting the router to make it available for use in the main server file (index.js).
// This export allows our application to handle requests for '/posts' and pass them to these specific routes.
module.exports = router;
