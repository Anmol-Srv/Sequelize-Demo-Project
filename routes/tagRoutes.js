const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

router.post('/', tagController.createTag);              // Create a new tag
router.get('/', tagController.getAllTags);              // Get all tags
router.put('/:id', tagController.updateTag);            // Update tag by ID
router.delete('/:id', tagController.deleteTag);         // Delete tag by ID

module.exports = router;
