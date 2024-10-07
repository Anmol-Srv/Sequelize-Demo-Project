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

    // Returning the User model for use in other parts of the application.
    // By exporting this model, we enable interaction with the User table, perform CRUD operations, and manage associations.
    return User;
};
