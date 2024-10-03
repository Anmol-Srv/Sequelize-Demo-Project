const { Post, User, Tag, sequelize } = require('../models');

// Create a new post for a user with a transaction
exports.createPost = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { title, content, userId, tags, status } = req.body;

        // Find the user
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Create the post with status (default is 'draft' if not provided)
        const post = await Post.create({ title, content, userId, status: status || 'draft' }, { transaction });

        // Handle tags
        if (tags && tags.length > 0) {
            const tagPromises = tags.map(tagName => Tag.findOrCreate({ where: { name: tagName } }));
            const tagInstances = await Promise.all(tagPromises);
            await post.addTags(tagInstances.map(tag => tag[0]), { transaction });
        }

        await transaction.commit();
        res.status(201).json(post);
    } catch (error) {
        await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};

// Get all posts with pagination and optional status filter
exports.getAllPosts = async (req, res) => {
    const { page = 1, limit = 10, status = 'active' } = req.query;  // Default status is 'active'
    try {
        const offset = (page - 1) * limit;

        // Apply scope based on status
        const posts = await Post.scope(status).findAndCountAll({
            include: [User, Tag],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        const totalPages = Math.ceil(posts.count / limit);
        res.status(200).json({
            posts: posts.rows,
            totalPages,
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get post by ID with tags and user
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [User, Tag]
        });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a post with validation
exports.updatePost = async (req, res) => {
    try {
        const { title, content, status } = req.body;

        // Custom validation: Title must be at least 5 characters
        if (title && title.length < 5) {
            throw new Error('Title must be at least 5 characters long.');
        }

        const [updated] = await Post.update(
            { title, content, status },  // Allow updating post status
            { where: { id: req.params.id } }
        );

        if (updated) {
            const updatedPost = await Post.findByPk(req.params.id);
            res.status(200).json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const deleted = await Post.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
