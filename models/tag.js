module.exports = (sequelize, DataTypes) => {
    // Defining the Tag model to represent categories or labels used to organize posts.
    // Each tag has a name, which is used to label posts with relevant topics or themes.
    // Scenario:
    // - In a blogging platform, tags allow users to categorize content by topics.
    // - For example, a post about "JavaScript Tips" might be tagged as "Programming" or "JavaScript".
    const Tag = sequelize.define('Tag', {
        // The 'name' field stores the name of the tag (e.g., 'Technology', 'Programming').
        // It is of type STRING, suitable for short descriptive words.
        // Setting `allowNull: false` ensures each tag has a name, as tags without names would be meaningless.
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Returning the Tag model for use throughout the application.
    // By exporting this model, we can interact with the Tag table, perform CRUD operations, and access associations.
    return Tag;
};
