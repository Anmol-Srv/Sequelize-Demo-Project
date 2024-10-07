// Importing Sequelize and DataTypes from the sequelize package.
// Sequelize is an ORM (Object-Relational Mapper) for working with databases through JavaScript code.
// DataTypes defines the types of data each model attribute can hold (e.g., string, integer).
const { Sequelize, DataTypes } = require('sequelize');

// Creating a new Sequelize instance to connect to the PostgreSQL database.
// This instance, named `sequelize`, will allow us to define models and interact with the database.
// - 'sequelize_demo' is the name of our database.
// - 'demo_user' is the username used to authenticate with the database.
// - 'password123' is the password for the database user.
// The configuration object specifies additional settings for the connection:
// - `logging: false` disables SQL query logging in the console, making it cleaner.
// - `host: 'localhost'` indicates the database is hosted locally.
// - `dialect: 'postgres'` sets the database type to PostgreSQL.
const sequelize = new Sequelize('sequelize_demo', 'demo_user', 'password123', {
  logging: false,    // Turns off console logging of raw SQL queries
  host: 'localhost', // Connects to a local database server
  dialect: 'postgres' // Specifies PostgreSQL as the database engine
});

// Defining our models by importing each model file and initializing it with the Sequelize instance.
// Each model file represents a table in the database and defines the structure of data stored in that table.
// Here, we have five models: User, Profile, Post, Tag, and PostTag.
// By passing `sequelize` and `DataTypes` to each model, we ensure they use the same database connection and datatype definitions.

// User model: Represents users in our application. Could store details like name, email, and password.
// Scenario: The User model is essential for applications where users can log in, create posts, etc.
const User = require('./user')(sequelize, DataTypes);

// Profile model: Represents additional user information.
// Scenario: This model could store details like a user bio or profile picture that isn't part of the main User table.
const Profile = require('./profile')(sequelize, DataTypes);

// Post model: Represents posts created by users, such as blog posts or articles.
// Scenario: The Post model could have fields like title, content, and creation date, associated with the user who created it.
const Post = require('./post')(sequelize, DataTypes);

// Tag model: Represents tags used to categorize or label posts.
// Scenario: Tags help categorize content, allowing users to filter posts by topics (like "Technology" or "Design").
const Tag = require('./tag')(sequelize, DataTypes);

// PostTag model: Represents the many-to-many relationship between Posts and Tags.
// Scenario: This model serves as a join table to associate posts with tags. For example, a post on JavaScript could be tagged as "Programming" and "Web Development".
const PostTag = require('./postTag')(sequelize, DataTypes);

// Exporting the sequelize instance and the models for use throughout the application.
// By exporting these objects, we can access and interact with the database, define relationships, and query data.
// Other files in the application can use these models to perform database operations, such as creating, updating, or retrieving data.
module.exports = {
  sequelize, // The Sequelize instance for interacting with the database
  User,      // The User model for managing user data
  Profile,   // The Profile model for managing additional user details
  Post,      // The Post model for managing blog posts or articles
  Tag,       // The Tag model for managing categories or labels for posts
  PostTag    // The PostTag model for managing associations between Posts and Tags
};
