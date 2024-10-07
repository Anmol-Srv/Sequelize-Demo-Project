// Importing the express library, which is used to create our web server and handle HTTP requests.
const express = require('express');

// Importing the sequelize instance we set up in our models folder.
// Sequelize is an Object-Relational Mapping (ORM) library, which lets us communicate with the database using JavaScript.
const { sequelize } = require('./models');

// Loads environment variables from a .env file into our application.
// Environment variables allow us to keep sensitive information (like database credentials) outside of our codebase.
require('dotenv').config();

// Importing route files for users, profiles, posts, and tags. 
// These files contain specific routes that handle requests related to each resource.
// By organizing routes in separate files, we keep our code clean and modular.
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');
const postTagRoutes = require('./routes/postTagRoutes')

// Importing custom error handling middleware.
// Middleware is a function that processes requests as they come in or responses as they go out.
// This particular middleware will catch any errors in our application and send a formatted error response back to the client.
const errorMiddleware = require('./middlewares/errorMiddleware');

// Initializing our Express application, which will be used to handle incoming requests and send responses.
const app = express();

// Middleware to parse incoming JSON request payloads.
// Express middleware functions are functions that have access to the request (req) and response (res) objects.
// This `express.json()` middleware specifically processes JSON-formatted data and attaches it to `req.body`.
// For example, if a client sends { "name": "Alice" } in a POST request, it will be available as req.body.name.
app.use(express.json());

// Adding our custom error handling middleware to the application.
// Middleware functions are often used to modify request/response objects or handle errors before sending the response back to the client.
// This error middleware will catch any errors that occur in our routes and format them into a consistent response.
app.use(errorMiddleware);

// Registering route handlers for specific paths:
// Each of these paths corresponds to a resource in our project.
// - "/users" will use the userRoutes we imported.
// - "/profiles" will use the profileRoutes we imported.
// - "/posts" will use the postRoutes we imported.
// - "/tags" will use the tagRoutes we imported.
// Example: When a client makes a GET request to /users, it will be handled by userRoutes.
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/posts', postRoutes);
app.use('/tags', tagRoutes);
app.use('/post-tags', postTagRoutes);


// Defining the root route ("/") for our application. 
// This route simply sends a welcome message back to the client when accessed. 
// It's a basic route used to confirm that our server is running and accessible.
app.get('/', (req, res) => {
    res.send('Welcome to Sequelize Demo');
});

// Defining the port number for our server.
// If there's a PORT variable in the environment, we use that. If not, we default to 3000.
// Using environment variables for settings like port numbers makes the application more flexible.
const PORT = process.env.PORT || 3000;

// Telling our Express application to start listening for incoming requests on the specified port.
// The app.listen() function starts a server and binds it to the specified port so it can accept requests.
// Once the server is running, a message is logged to the console to confirm the server's URL.
// Example: If PORT is 3000, we can access the server at http://localhost:3000/.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
