module.exports = (sequelize, DataTypes) => {
    // Defining the Profile model, which represents additional user information.
    // Each profile contains a bio and a userId that links it to a specific user.
    // Scenario:
    // - In many applications, users have additional information associated with their account.
    // - Rather than storing this info directly in the User table, we use a separate Profile model to maintain modularity.
    // - This model allows us to store details that are specific to the user's profile, such as a bio, without cluttering the main User model.
    const Profile = sequelize.define('Profile', {
        // The 'bio' field stores a short description or biography of the user.
        // It is of type TEXT to accommodate longer descriptions, if necessary.
        // Since not all users may have a bio, we set `allowNull: true`.
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // The 'userId' field links the profile to a specific user.
        // It is of type INTEGER, and `allowNull: false` ensures every profile is tied to a user.
        // This field acts as a foreign key, referencing the User model.
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    // Returning the Profile model for use in other parts of the application.
    // By exporting this model, we can use it to interact with the Profile table, perform CRUD operations, and access associations.
    return Profile;
};
