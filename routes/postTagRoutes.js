const express = require('express');
const router = express.Router();
const postTagController = require('../controllers/postTagController');

router.post('/:postId/tags', postTagController.addTagToPost);         // Add a tag to a post
router.delete('/:postId/tags', postTagController.removeTagFromPost);  // Remove a tag from a post

module.exports = router;
