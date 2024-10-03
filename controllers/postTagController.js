const { Post, Tag } = require('../models');

// Associate a tag with a post
exports.addTagToPost = async (req, res) => {
    try {
        const { tagId } = req.body;
        const post = await Post.findByPk(req.params.postId);
        const tag = await Tag.findByPk(tagId);

        if (!post || !tag) {
            return res.status(404).json({ message: 'Post or Tag not found' });
        }

        await post.addTag(tag);
        res.status(200).json({ message: 'Tag added to post successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove a tag from a post
exports.removeTagFromPost = async (req, res) => {
    try {
        const { tagId } = req.body;
        const post = await Post.findByPk(req.params.postId);
        const tag = await Tag.findByPk(tagId);

        if (!post || !tag) {
            return res.status(404).json({ message: 'Post or Tag not found' });
        }

        await post.removeTag(tag);
        res.status(200).json({ message: 'Tag removed from post successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
