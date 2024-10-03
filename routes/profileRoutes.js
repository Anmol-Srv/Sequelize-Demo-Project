const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/', profileController.createProfile);             // Create a profile
router.get('/:userId', profileController.getProfile);          // Get a profile by user ID
router.put('/:userId', profileController.updateProfile);       // Update a profile by user ID
router.delete('/:userId', profileController.deleteProfile);    // Delete a profile by user ID

module.exports = router;
