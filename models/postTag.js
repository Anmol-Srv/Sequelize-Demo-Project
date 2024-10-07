module.exports = (sequelize, DataTypes) => {
    // Defining the PostTag model, which acts as a join table for the many-to-many relationship between Post and Tag models.
    // This model stores pairs of postId and tagId to link individual posts with specific tags.
    // Scenario:
    // - In a blogging platform, posts are often categorized with multiple tags (e.g., 'Technology', 'JavaScript').
    // - Conversely, each tag can be associated with multiple posts, allowing easy categorization and filtering.
    // - The PostTag model facilitates this connection by storing each unique pairing of post and tag.
    const PostTag = sequelize.define('PostTag', {
        // The 'postId' field stores the ID of the post in the association.
        // This foreign key references the primary key in the Post model.
        // Setting `allowNull: false` ensures that each record in PostTag is associated with a valid post.
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // The 'tagId' field stores the ID of the tag in the association.
        // This foreign key references the primary key in the Tag model.
        // Setting `allowNull: false` ensures that each record in PostTag is associated with a valid tag.
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    // Returning the PostTag model for use in associations and throughout the application.
    // This model doesn’t have associations defined here, as its sole purpose is to act as a join table.
    // It is used in many-to-many relationships within the Post and Tag models to enable content categorization.
    return PostTag;
};
