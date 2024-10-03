const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);              // Create a new post
router.get('/', postController.getAllPosts);              // Get all posts with pagination and status filtering
router.get('/:id', postController.getPostById);           // Get post by ID
router.put('/:id', postController.updatePost);            // Update post by ID
router.delete('/:id', postController.deletePost);         // Delete post by ID

module.exports = router;
