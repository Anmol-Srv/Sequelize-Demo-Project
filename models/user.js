module.exports = (sequelize, DataTypes) => {
    // Defining the User model to represent users in our application.
    // Each user has attributes such as firstName, lastName, and email.
    // Scenario:
    // - The User model is central to many applications, representing registered users who can create content, update their profile, and more.
    // - This model enables us to store essential user information and link each user to other resources, such as profiles and posts.
    const User = sequelize.define('User', {
        // The 'firstName' field represents the user's first name.
        // It is of type STRING and is required, as indicated by `allowNull: false`.
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // The 'lastName' field represents the user's last name.
        // Like 'firstName', it is a required STRING field.
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // The 'email' field stores the user's email address.
        // This field is required (`allowNull: false`), unique (no two users can have the same email), and validated to be a proper email format.
        // This setup helps enforce email uniqueness and correct formatting.
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    }, {
        // Hooks are functions that run automatically at specific points in the model's lifecycle.
        // This model includes an 'afterCreate' hook to log a message whenever a new user is registered.
        // Scenario:
        // - The afterCreate hook helps with logging and analytics, such as sending notifications or logging new registrations for monitoring purposes.
        hooks: {
            afterCreate: (user) => {
                console.log(`New user registered: ${user.firstName} ${user.lastName} (Email: ${user.email})`);
            }
        }
    });

    // Defining associations for the User model.
    // Associations help describe how this model relates to other models in the application.

    User.associate = function (models) {
        // One-to-One Relationship with Profile:
        // - User.hasOne(Profile): Indicates that each User has one Profile.
        // - foreignKey: 'userId' sets up the relationship, linking the Profile to the User.
        // - Scenario:
        //   - This setup allows each user to have additional details, like a bio, stored in a separate Profile table.
        //   - We use Profile.belongsTo(User) on the Profile model to complete the association, allowing retrieval of user information along with their profile.
        User.hasOne(models.Profile, { foreignKey: 'userId' });
        models.Profile.belongsTo(User, { foreignKey: 'userId' });

        // One-to-Many Relationship with Post:
        // - User.hasMany(Post): Indicates that each User can have multiple Posts.
        // - foreignKey: 'userId' links each post to a specific user, who acts as the post's author.
        // - Scenario:
        //   - This setup models a blogging platform or social media application where each user can create multiple posts.
        //   - The Post model has Post.belongsTo(User) to complete this association, allowing us to retrieve posts along with the user details of the author.
        User.hasMany(models.Post, { foreignKey: 'userId' });
        models.Post.belongsTo(User, { foreignKey: 'userId' });
    };

    // Returning the User model for use in other parts of the application.
    // By exporting this model, we enable interaction with the User table, perform CRUD operations, and manage associations.
    return User;
};
