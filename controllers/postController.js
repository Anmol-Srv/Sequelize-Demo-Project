// Importing necessary models and the sequelize instance for database interactions.
// - Post, User, and Tag models allow us to interact with the respective tables in the database.
// - sequelize is imported for managing transactions, which ensure data consistency when performing multiple database operations.
const { Post, User, Tag, sequelize } = require('../models');

// Create a new post for a user with a transaction
// This function creates a new post associated with a specific user, and optionally tags the post with categories.
exports.createPost = async (req, res) => {
    // Start a transaction, which is a sequence of database operations that are treated as a single unit.
    // - Transactions ensure that either all operations succeed or none of them do.
    // - This is useful when performing multiple related database actions, so partial changes aren’t saved if an error occurs.
    const transaction = await sequelize.transaction();
    try {
        const { title, content, userId, tags, status } = req.body;

        // Find the user who is creating the post by their primary key (userId).
        // - If the user does not exist, we throw an error to prevent creating a post without a valid user association.
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Create the post in the database.
        // - The `status` field has a default value of 'draft' if not provided.
        // - The `transaction` option ensures this step is part of the transaction.
        const post = await Post.create(
            { title, content, userId, status: status || 'draft' },
            { transaction }
        );

        // Handle the tags associated with the post.
        // - `tags` is an array of tag names.
        // - We find or create each tag and associate it with the post.
        if (tags && tags.length > 0) {
            const tagPromises = tags.map(tagName => Tag.findOrCreate({ where: { name: tagName } }));
            const tagInstances = await Promise.all(tagPromises);
            // Add tags to the post within the transaction.
            await post.addTags(tagInstances.map(tag => tag[0]), { transaction });
        }

        // Commit the transaction to save all changes.
        // - If no errors occurred, the transaction completes successfully, saving the post and its tags.
        await transaction.commit();
        res.status(201).json(post);
    } catch (error) {
        // Roll back the transaction if an error occurs.
        // - This undoes any changes made during the transaction to keep the database consistent.
        await transaction.rollback();
        res.status(400).json({ error: error.message });
    }
};

// Get all posts with pagination and optional status filter
// This function retrieves all posts, with options to filter by status and paginate results.
exports.getAllPosts = async (req, res) => {
    // Destructure the query parameters and set defaults.
    // - `page` and `limit` control pagination.
    // - `status` is used to filter posts by their current status (e.g., active, draft, archived).
    const { page = 1, limit = 10, status = 'active' } = req.query;
    try {
        // Calculate the offset for pagination.
        // - `offset` determines where the database query starts returning rows.
        // - For example, if page is 2 and limit is 10, the offset will be 10, skipping the first 10 results.
        const offset = (page - 1) * limit;

        // Use a scope to filter posts by status and retrieve them with related user and tag information.
        // - `scope(status)`: applies a predefined scope to filter posts based on the specified status.
        const posts = await Post.scope(status).findAndCountAll({
            include: [User, Tag],               // Include User and Tag associations
            limit: parseInt(limit),             // Limit results for pagination
            offset: parseInt(offset),           // Skip rows for pagination
            order: [['createdAt', 'DESC']]      // Order posts by creation date in descending order
        });

        // Calculate the total number of pages based on the result count and limit.
        // - `totalPages` helps frontend applications display pagination controls.
        const totalPages = Math.ceil(posts.count / limit);
        res.status(200).json({
            posts: posts.rows,                  // List of posts for the current page
            totalPages,                         // Total pages available
            currentPage: parseInt(page),        // Current page number
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get post by ID with tags and user
// This function retrieves a specific post by its ID, along with associated tags and user details.
exports.getPostById = async (req, res) => {
    try {
        // Find the post by its primary key (ID) and include User and Tag associations.
        // - This allows the client to see who created the post and any tags it has.
        const post = await Post.findByPk(req.params.id, {
            include: [User, Tag]
        });
        if (!post) {
            // If the post does not exist, return a 404 error.
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a post with validation
// This function updates a post's details, such as the title, content, and status, with custom validation.
exports.updatePost = async (req, res) => {
    try {
        const { title, content, status } = req.body;

        // Custom validation to ensure title meets length requirements.
        // - If the title is too short, we throw an error to prevent the update.
        if (title && title.length < 5) {
            throw new Error('Title must be at least 5 characters long.');
        }

        // Update the post's data in the database based on its ID.
        const [updated] = await Post.update(
            { title, content, status },        // Fields to update
            { where: { id: req.params.id } }   // Find the post by ID
        );

        if (updated) {
            // If the update was successful, retrieve the updated post and return it.
            const updatedPost = await Post.findByPk(req.params.id);
            res.status(200).json(updatedPost);
        } else {
            // If no post was found to update, return a 404 error.
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a post
// This function deletes a post based on its ID.
exports.deletePost = async (req, res) => {
    try {
        // Delete the post with the specified ID.
        const deleted = await Post.destroy({ where: { id: req.params.id } });
        if (deleted) {
            // If the post was deleted successfully, return a 204 (No Content) status.
            res.status(204).send();
        } else {
            // If no post was found to delete, return a 404 error.
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
