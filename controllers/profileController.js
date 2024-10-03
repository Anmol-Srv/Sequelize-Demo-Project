const { Profile, User } = require('../models');

// Create a profile for a user
exports.createProfile = async (req, res) => {
    try {
        const { bio, userId } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const profile = await Profile.create({ bio, userId });
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a user's profile
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({
            where: { userId: req.params.userId },
            include: [User]
        });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user's profile
exports.updateProfile = async (req, res) => {
    try {
        const { bio } = req.body;
        const [updated] = await Profile.update({ bio }, {
            where: { userId: req.params.userId }
        });

        if (updated) {
            const updatedProfile = await Profile.findOne({ where: { userId: req.params.userId } });
            res.status(200).json(updatedProfile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user's profile
exports.deleteProfile = async (req, res) => {
    try {
        const deleted = await Profile.destroy({
            where: { userId: req.params.userId }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
