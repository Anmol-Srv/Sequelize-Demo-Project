const { Tag } = require('../models');

// Create a new tag
exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const tag = await Tag.create({ name });
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all tags
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a tag
exports.updateTag = async (req, res) => {
    try {
        const { name } = req.body;
        const [updated] = await Tag.update({ name }, { where: { id: req.params.id } });
        if (updated) {
            const updatedTag = await Tag.findByPk(req.params.id);
            res.status(200).json(updatedTag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a tag
exports.deleteTag = async (req, res) => {
    try {
        const deleted = await Tag.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
