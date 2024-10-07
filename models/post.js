module.exports = (sequelize, DataTypes) => {
    // Defining the Post model to represent blog posts or articles in our application.
    // Each post has fields like 'title', 'content', 'userId', and 'status'.
    // This structure enables us to store essential details for each post and link them to users and tags.
    const Post = sequelize.define('Post', {
        // The 'title' field represents the title of the post.
        // It is of type STRING, which allows short textual content.
        // We set `allowNull: false` to ensure each post must have a title.
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // The 'content' field represents the main body of the post.
        // It is of type TEXT, which is suitable for longer pieces of text content.
        // We also set `allowNull: false` to ensure every post has content.
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // The 'userId' field links the post to a specific user by their ID.
        // This makes it possible to know which user authored each post.
        // Setting `allowNull: false` ensures that every post has an associated user.
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // The 'status' field indicates the post's current status, which could be 'active', 'draft', or 'archived'.
        // We use an ENUM type to restrict this field to predefined values, helping to maintain data consistency.
        // The `defaultValue` is set to 'draft', meaning new posts will start as drafts.
        status: {
            type: DataTypes.ENUM('active', 'draft', 'archived'),
            defaultValue: 'draft'
        },
    }, {
        // Scopes allow us to define reusable query filters on the model.
        // For example, we can filter posts by their status (active, draft, archived).
        // Scenarios:
        // - The 'active' scope is useful when we want to display only active posts on a main blog page.
        // - The 'archived' scope could be used for administrative views that include old or inactive posts.
        // - The 'draft' scope can be used by users to view their unpublished work.
        scopes: {
            active: { where: { status: 'active' } },
            archived: { where: { status: 'archived' } },
            draft: { where: { status: 'draft' } }
        },
        // Hooks are functions that run automatically at various points in the model's lifecycle.
        // Here, we use an 'afterCreate' hook to log information whenever a new post is created.
        // Scenario:
        // - This is useful for auditing and tracking activity, such as sending notifications or logging when new content is added.
        hooks: {
            afterCreate: async (post) => {
                // Fetch the user directly using the userId field on the post
                const user = await sequelize.models.User.findByPk(post.userId);
                if (user) {
                    console.log(`New post created by ${user.firstName} ${user.lastName}: Title - "${post.title}", Status - ${post.status}`);
                }
            }
        }
    });

    // Returning the defined Post model so it can be used in other parts of the application.
    // This return statement makes the model available for queries, associations, and other database operations.
    return Post;
};