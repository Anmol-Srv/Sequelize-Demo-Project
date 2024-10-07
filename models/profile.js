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

    // Defining associations for the Profile model.
    // Associations describe how this model relates to others in the database.

    Profile.associate = function (models) {
        // Associating Profile with User in a one-to-one relationship.
        // - Profile.belongsTo(User): Indicates that each Profile is linked to exactly one User.
        // - foreignKey: 'userId' ensures the userId field in Profile references the id field in User.
        // Scenario:
        // - This relationship lets us easily retrieve a user's profile information.
        // - For example, when displaying a user's profile page, we can fetch the associated bio using this link.
        Profile.belongsTo(models.User, { foreignKey: 'userId' });
    };

    // Returning the Profile model for use in other parts of the application.
    // By exporting this model, we can use it to interact with the Profile table, perform CRUD operations, and access associations.
    return Profile;
};
