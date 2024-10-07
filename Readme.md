# Sequelize Demo Project

This repository demonstrates the use of **Sequelize**, a powerful promise-based ORM (Object Relational Mapper) for Node.js. Sequelize supports popular databases like Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. With Sequelize, you can define models for your data, perform CRUD operations, and manage complex relationships directly from JavaScript, streamlining interactions with your database.

## Table of Contents

1. [What is Sequelize?](#what-is-sequelize)
2. [Project Overview](#project-overview)
3. [Folder Structure](#folder-structure)
4. [Key Sequelize Concepts](#key-sequelize-concepts)
5. [Implementation Details](#implementation-details)
6. [Getting Started](#getting-started)
7. [Usage](#usage)

---

## What is Sequelize?

Sequelize is a Node.js ORM for relational databases, offering a structured way to interact with your database from JavaScript. By defining **models** that represent tables, Sequelize enables you to work with your data as objects rather than through raw SQL queries. Here’s a deeper look into what Sequelize offers:

- **Model Definitions**: Define models to represent tables in your database, including attributes and data types. Models provide a layer of abstraction, making it easy to work with data through JavaScript rather than SQL.

- **Associations**: Sequelize allows you to establish relationships between models, like One-to-One, One-to-Many, and Many-to-Many. These associations simplify the management of related data and enable complex queries through model relationships.

- **Hooks**: With hooks, you can run functions at specific points in a model's lifecycle, like before saving a record or after deleting it. Hooks are useful for tasks like validation, logging, and additional logic around database operations.

- **Scopes**: Scopes allow you to define reusable filters that can be applied to queries. They’re useful for situations where you need to filter records based on specific conditions regularly.

- **Transactions**: Transactions ensure that a series of operations are executed as a single unit, which is essential for maintaining data integrity. With transactions, if any part of the sequence fails, all operations are rolled back.

Sequelize simplifies database interactions, reduces the potential for SQL injection, and enables a more organized and maintainable codebase by mapping database tables to JavaScript objects.

---

## Project Overview

This project showcases Sequelize through a blogging platform simulation. The application includes models for **Users**, **Profiles**, **Posts**, and **Tags**, with realistic relationships between them. The goal of this project is to provide a practical guide to the following Sequelize concepts:

- Defining models and managing associations.
- Utilizing scopes for data filtering.
- Adding hooks for custom logic during lifecycle events.
- Using transactions for data integrity.
- Performing CRUD operations with the Express.js framework.

By working through this codebase, learners will gain hands-on experience with Sequelize’s core features and best practices, using a structured project as a guide.

---

## Folder Structure

The following folder structure organizes the code into separate files for easier management, promoting separation of concerns and maintainability.

```
.
├── config
│   └── config.json          # Database connection settings
├── controllers
│   ├── postController.js    # Handles CRUD for Posts
│   ├── postTagController.js # Manages tag associations with posts
│   ├── profileController.js # Handles CRUD for Profiles
│   ├── tagController.js     # Handles CRUD for Tags
│   └── userController.js    # Handles CRUD for Users
├── middlewares
│   └── errorMiddleware.js   # Global error handling middleware
├── models
│   ├── index.js             # Entry point for model loading and associations
│   ├── post.js              # Post model definition
│   ├── postTag.js           # Join table for Post-Tag Many-to-Many association
│   ├── profile.js           # Profile model definition
│   ├── tag.js               # Tag model definition
│   └── user.js              # User model definition
├── routes
│   ├── postRoutes.js        # Routes for Post API endpoints
│   ├── postTagRoutes.js     # Routes for associating tags with posts
│   ├── profileRoutes.js     # Routes for Profile API endpoints
│   ├── tagRoutes.js         # Routes for Tag API endpoints
│   └── userRoutes.js        # Routes for User API endpoints
├── utils
│   ├── seed.js              # Database seeding script
│   ├── sync.js              # Database synchronization script
│   └── test.js              # Script for generating test data
├── .gitignore               # Specifies files ignored by Git
├── index.js                 # Main application entry point
└── package.json             # Project metadata and dependencies
```

### Folder and File Details

- **config**: Defines database connection settings, with separate configurations for development, testing, and production environments.

- **controllers**: Contains logic for handling requests and interacting with models. Each controller is dedicated to a specific resource (e.g., users, posts) and includes functions for CRUD operations.

- **middlewares**: Manages custom middleware logic, such as error handling. Middleware processes requests and responses, adding functionality to Express routes.

- **models**: Defines Sequelize models, which map to database tables. Each model file represents a table and includes attributes, data types, and associations.

- **routes**: Maps HTTP endpoints to controller functions. Each route file corresponds to a resource and defines paths for CRUD operations.

- **utils**: Contains scripts for database operations. The seeding and synchronization scripts prepare the database with initial data and structure.

---

## Key Sequelize Concepts

### 1. **Models**

   Models in Sequelize represent tables in the database. They define the structure, data types, and constraints of each column.

   - **User Model**: Stores user information like `firstName`, `lastName`, and `email`. Located in `models/user.js`.
   - **Post Model**: Represents posts with attributes like `title`, `content`, and `status`. Located in `models/post.js`.

   **Learn More**: Each model file includes details on data types, validation, and associations.

### 2. **Associations**

   Associations define relationships between models, which enable you to easily fetch related data across tables.

   - **One-to-One**: Each user has one profile (`User.hasOne(Profile)`). This setup is in `models/user.js` and `models/profile.js`.
   - **One-to-Many**: Users can have multiple posts (`User.hasMany(Post)`). Set up in `models/user.js`.
   - **Many-to-Many**: Posts can have multiple tags, and each tag can relate to multiple posts (`Post.belongsToMany(Tag, { through: PostTag })`). Configured in `models/post.js` and `models/tag.js`.

   **Learn More**: See the `models/index.js` file for association configuration and `postController.js` for implementation.

### 3. **Scopes**

   Scopes allow you to define reusable query filters. They’re used to streamline queries by filtering data based on conditions like status.

   - **Example**: Filtering posts by `status` (e.g., active, draft, archived) is defined in `models/post.js`.

   **Learn More**: The post model contains scopes to categorize posts based on their status, making it easy to retrieve only the posts with a specific status.

### 4. **Hooks**

   Hooks are functions that run automatically at specific points in a model's lifecycle. Hooks can be used for validation, logging, and other side effects.

   - **Example**: Log a message when a new post is created (`afterCreate` hook in `models/post.js`).

   **Learn More**: Hooks are implemented in the user and post models to add functionality after records are created.

### 5. **Transactions**

   Transactions ensure data integrity by executing a series of database operations as a single unit. If one operation fails, all operations are rolled back.

   - **Example**: Creating a new post and associating tags in a transaction in `controllers/postController.js`.

   **Learn More**: See `postController.js` for an example of transaction usage when handling multiple operations.

---

## Implementation Details

- **Database Synchronization**: The `utils/sync.js` script sets up tables based on model definitions.
- **Seeding Data**: Use `utils/seed.js` to populate the database with sample data for testing and development.
- **Error Handling**: Global error handling middleware in `middlewares/errorMiddleware.js` provides consistent error responses across the app.

---

## Getting Started

### 1. **Clone the Repository**

First, clone this repository to your local machine and navigate into the project directory:

```bash
git clone <repository-url>
cd sequelize-demo-project
```

### 2. **Install Project Dependencies**

Install the necessary dependencies by running:

```bash
npm install
```

### 3. **Set Up the Database Locally**

This project uses MySQL for the database, as specified in the `config/config.json` file. Follow these steps to create the database and user with the correct permissions:

1. **Open MySQL CLI**: Access the MySQL CLI. You may need to enter your MySQL root password if prompted:
   ```bash
   mysql -u root -p
   ```

2. **Create the Database**: Create a database named `sequelize_demo`:
   ```sql
   CREATE DATABASE sequelize_demo;
   ```

3. **Create a User**: Create a user named `demo_user` with the password `password123`. This user will have access to the `sequelize_demo` database:
   ```sql
   CREATE USER 'demo_user'@'localhost' IDENTIFIED BY 'password123';
   ```

4. **Grant Permissions**: Grant all privileges on the `sequelize_demo` database to `demo_user`:
   ```sql
   GRANT ALL PRIVILEGES ON sequelize_demo.* TO 'demo_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

5. **Exit the MySQL CLI**:
   ```sql
   EXIT;
   ```

With the database and user configured, your local MySQL server is now ready to be used with the project.

### 4. **Synchronize Database Tables**

Use the `sync.js` script to synchronize your Sequelize models with the database. This will create the necessary tables as defined in the model files:

```bash
node utils/sync.js
```

Running this command will create tables for **User**, **Profile**, **Post**, **Tag**, and **PostTag** based on the models and associations in the project.

### 5. **Seed the Database with Initial Data**

To populate your database with sample data, run the `seed.js` script. This creates initial records in each table, allowing you to test and explore the relationships between users, profiles, posts, and tags:

```bash
node utils/seed.js
```

### 6. **Start the Server**

After setting up the database and seeding data, start the application with the following command:

```bash
npm start
```

The server will start on **http://localhost:3000** by default. You should see the message: `Server running on http://localhost:3000`.

---

### **Your Local Setup is Ready!**

You can now interact with the API endpoints using tools like Postman or your preferred API client. The server will respond to various endpoints for managing users, profiles, posts, and tags, allowing you to test the application and explore Sequelize concepts.

---

## Usage

After setting up the repository and starting the server, you can test the functionality by interacting with the API endpoints. Below are detailed steps to test each feature of the application using tools like **Postman** or **cURL**.

### Base URL

The server is running at **http://localhost:3000** by default. All routes will be relative to this base URL.

---
Here’s a detailed guide for testing the **User Routes** in the repository. This section explains each endpoint's purpose, expected inputs, and possible outputs, including error handling scenarios. Let’s go through each route one by one.

---

## User Routes

The **User Routes** allow you to create, retrieve, update, and delete users. They also support retrieving a user by ID, which includes the user’s associated profile and posts if available.

### **1. Create a User**

- **Endpoint**: `POST /users`
- **Description**: This route allows you to create a new user in the application by providing basic user details such as first name, last name, and email.
- **Request Body**:
  ```json
  {
      "firstName": "Alice",
      "lastName": "Johnson",
      "email": "alice@example.com"
  }
  ```
  - **`firstName`**: Required. The first name of the user.
  - **`lastName`**: Required. The last name of the user.
  - **`email`**: Required. The email of the user. It must be unique and a valid email format.

- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"firstName": "Alice", "lastName": "Johnson", "email": "alice@example.com"}'
  ```

- **Expected Response**:
  - **Status**: `201 Created`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "email": "alice@example.com",
        "updatedAt": "2023-09-30T12:34:56.789Z",
        "createdAt": "2023-09-30T12:34:56.789Z"
    }
    ```
  - **Description**: The response includes the user's ID, timestamps, and the other provided details.

- **Error Handling**:
  - If the `email` field is invalid or missing, or if a user with the same email already exists, the server responds with:
    - **Status**: `400 Bad Request`
    - **Response Body**:
      ```json
      {
          "error": "Validation error message"
      }
      ```

---

### **2. Get All Users**

- **Endpoint**: `GET /users`
- **Description**: This route retrieves all users in the database.
- **Example cURL**:
  ```bash
  curl http://localhost:3000/users
  ```

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    [
        {
            "id": 1,
            "firstName": "Alice",
            "lastName": "Johnson",
            "email": "alice@example.com",
            "createdAt": "2023-09-30T12:34:56.789Z",
            "updatedAt": "2023-09-30T12:34:56.789Z"
        },
        {
            "id": 2,
            "firstName": "Bob",
            "lastName": "Smith",
            "email": "bob@example.com",
            "createdAt": "2023-09-30T12:35:12.345Z",
            "updatedAt": "2023-09-30T12:35:12.345Z"
        }
    ]
    ```
  - **Description**: This response includes an array of all users with their details.

---

### **3. Get User by ID (with Profile and Posts)**

- **Endpoint**: `GET /users/:id`
- **Description**: This route retrieves a specific user by their ID and includes their profile and posts if they exist. If the user has no profile or posts, it will return an error message.
- **Example URL**: `http://localhost:3000/users/1`

- **Expected Response (with Profile and Posts)**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "firstName": "Alice",
        "lastName": "Johnson",
        "email": "alice@example.com",
        "profile": {
            "bio": "Alice is a web developer.",
            "createdAt": "2023-09-30T12:36:01.456Z",
            "updatedAt": "2023-09-30T12:36:01.456Z"
        },
        "posts": [
            {
                "title": "Learning Sequelize",
                "content": "Sequelize is a great ORM for Node.js.",
                "status": "active",
                "createdAt": "2023-09-30T12:37:23.789Z",
                "updatedAt": "2023-09-30T12:37:23.789Z"
            }
        ]
    }
    ```
  - **Description**: The response includes the user details, their profile information, and an array of posts they’ve created.

- **Error Response (No Profile or Posts)**:
  - **Status**: `404 Not Found`
  - **Response Body**:
    ```json
    {
        "error": "Profile is not associated to User!"
    }
    ```

  - **Explanation**: This error occurs when the user does not have an associated profile or posts.

- **Example cURL**:
  ```bash
  curl http://localhost:3000/users/1
  ```

---

### **4. Update a User**

- **Endpoint**: `PUT /users/:id`
- **Description**: This route updates a user’s information based on their ID.
- **Request Body**:
  ```json
  {
      "firstName": "Alice",
      "lastName": "Williams",
      "email": "alicew@example.com"
  }
  ```
  - **`firstName`**, **`lastName`**, **`email`**: All fields are optional. If provided, they will be updated.

- **Example cURL**:
  ```bash
  curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"firstName": "Alice", "lastName": "Williams", "email": "alicew@example.com"}'
  ```

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "firstName": "Alice",
        "lastName": "Williams",
        "email": "alicew@example.com",
        "updatedAt": "2023-09-30T12:40:22.789Z",
        "createdAt": "2023-09-30T12:34:56.789Z"
    }
    ```
  - **Description**: The response shows the updated user information.

- **Error Handling**:
  - If the user ID does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "User not found"
      }
      ```

---

### **5. Delete a User**

- **Endpoint**: `DELETE /users/:id`
- **Description**: This route deletes a user from the database based on their ID.
- **Example cURL**:
  ```bash
  curl -X DELETE http://localhost:3000/users/1
  ```

- **Expected Response**:
  - **Status**: `204 No Content`
  - **Description**: No content is returned upon successful deletion, indicating that the user was deleted from the database.

- **Error Handling**:
  - If the user ID does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "User not found"
      }
      ```
Let’s continue with a detailed guide for testing the remaining API endpoints: **Profile Routes**, **Post Routes**, **Tag Routes**, and **Post-Tag Association Routes**. This will cover each route's purpose, expected inputs, and possible outputs, including error handling.

---

## Profile Routes

The **Profile Routes** manage the profiles associated with users. Each user can have one profile, which includes additional details about the user.

### **1. Create a Profile**

- **Endpoint**: `POST /profiles`
- **Description**: This route creates a profile for a user, linking additional information like a bio.
- **Request Body**:
  ```json
  {
      "bio": "Alice is a web developer.",
      "userId": 1
  }
  ```
  - **`bio`**: Required. Additional information about the user.
  - **`userId`**: Required. The ID of the user to associate with this profile.

- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/profiles -H "Content-Type: application/json" -d '{"bio": "Alice is a web developer.", "userId": 1}'
  ```

- **Expected Response**:
  - **Status**: `201 Created`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "bio": "Alice is a web developer.",
        "userId": 1,
        "createdAt": "2023-09-30T12:45:22.789Z",
        "updatedAt": "2023-09-30T12:45:22.789Z"
    }
    ```

- **Error Handling**:
  - If the specified user does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "User not found"
      }
      ```

---

### **2. Get Profile by User ID**

- **Endpoint**: `GET /profiles/:userId`
- **Description**: Retrieves a user’s profile based on the user ID. This includes the profile details if the profile exists.
- **Example URL**: `http://localhost:3000/profiles/1`

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "bio": "Alice is a web developer.",
        "userId": 1,
        "createdAt": "2023-09-30T12:45:22.789Z",
        "updatedAt": "2023-09-30T12:45:22.789Z"
    }
    ```

- **Error Handling**:
  - If the profile does not exist for the specified user, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Profile not found"
      }
      ```

---

### **3. Update a Profile**

- **Endpoint**: `PUT /profiles/:userId`
- **Description**: Updates a user’s profile based on the user ID.
- **Request Body**:
  ```json
  {
      "bio": "Alice is now a senior web developer."
  }
  ```

- **Example cURL**:
  ```bash
  curl -X PUT http://localhost:3000/profiles/1 -H "Content-Type: application/json" -d '{"bio": "Alice is now a senior web developer."}'
  ```

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "bio": "Alice is now a senior web developer.",
        "userId": 1,
        "updatedAt": "2023-09-30T12:55:33.123Z",
        "createdAt": "2023-09-30T12:45:22.789Z"
    }
    ```

- **Error Handling**:
  - If the profile is not found, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Profile not found"
      }
      ```

---

### **4. Delete a Profile**

- **Endpoint**: `DELETE /profiles/:userId`
- **Description**: Deletes a user’s profile based on the user ID.
- **Example cURL**:
  ```bash
  curl -X DELETE http://localhost:3000/profiles/1
  ```

- **Expected Response**:
  - **Status**: `204 No Content`

- **Error Handling**:
  - If the profile is not found, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Profile not found"
      }
      ```

---

## Post Routes

The **Post Routes** allow you to create, retrieve, update, and delete blog posts associated with users.

### **1. Create a Post**

- **Endpoint**: `POST /posts`
- **Description**: Creates a new post for a specific user, with optional tags and status.
- **Request Body**:
  ```json
  {
      "title": "Learning Sequelize",
      "content": "Sequelize is a great ORM for Node.js.",
      "userId": 1,
      "tags": ["JavaScript", "Node.js"],
      "status": "active"
  }
  ```

- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d '{"title": "Learning Sequelize", "content": "Sequelize is a great ORM for Node.js.", "userId": 1, "tags": ["JavaScript", "Node.js"], "status": "active"}'
  ```

- **Expected Response**:
  - **Status**: `201 Created`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "title": "Learning Sequelize",
        "content": "Sequelize is a great ORM for Node.js.",
        "userId": 1,
        "status": "active",
        "createdAt": "2023-09-30T13:00:11.789Z",
        "updatedAt": "2023-09-30T13:00:11.789Z"
    }
    ```

- **Error Handling**:
  - If the user does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "User not found"
      }
      ```

---

### **2. Get All Posts (with Pagination and Status Filter)**

- **Endpoint**: `GET /posts`
- **Description**: Retrieves all posts with optional pagination and status filtering.
- **Example URL**: `http://localhost:3000/posts?page=1&limit=10&status=active`

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "posts": [
            {
                "id": 1,
                "title": "Learning Sequelize",
                "content": "Sequelize is a great ORM for Node.js.",
                "status": "active",
                "createdAt": "2023-09-30T13:00:11.789Z",
                "updatedAt": "2023-09-30T13:00:11.789Z"
            }
        ],
        "totalPages": 1,
        "currentPage": 1
    }
    ```

- **Query Parameters**:
  - **`page`**: Optional. The page number (default is 1).
  - **`limit`**: Optional. The number of results per page (default is 10).
  - **`status`**: Optional. Filters posts by status (active, draft, archived).

---

### **3. Get Post by ID**

- **Endpoint**: `GET /posts/:id`
- **Description**: Retrieves a post by its ID, including the associated user and tags.
- **Example URL**: `http://localhost:3000/posts/1`

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "title": "Learning Sequelize",
        "content": "Sequelize is a great ORM for Node.js.",
        "userId": 1,
        "status": "active",
        "createdAt": "2023-09-30T13:00:11.789Z",
        "updatedAt": "2023-09-30T13:00:11.789Z",
        "user": {
            "firstName": "Alice",
            "lastName": "Johnson"
        },
        "tags": [
            { "name": "JavaScript" },
            { "name": "Node.js" }
        ]
    }
    ```

---

Continuing with the **Post Routes**, here’s a detailed explanation of the remaining routes for updating and deleting posts, as well as error handling scenarios.

---

### **4. Update a Post**

- **Endpoint**: `PUT /posts/:id`
- **Description**: This route allows you to update a post’s details such as `title`, `content`, and `status`. You need to provide the post ID in the URL and the fields you want to update in the request body.
- **Request Body**:
  ```json
  {
      "title": "Advanced Sequelize Concepts",
      "content": "Sequelize offers features like scopes, hooks, and transactions.",
      "status": "draft"
  }
  ```
  - **`title`**: Optional. The new title for the post.
  - **`content`**: Optional. The new content for the post.
  - **`status`**: Optional. The status of the post. It can be "active", "draft", or "archived".

- **Example cURL**:
  ```bash
  curl -X PUT http://localhost:3000/posts/1 -H "Content-Type: application/json" -d '{"title": "Advanced Sequelize Concepts", "content": "Sequelize offers features like scopes, hooks, and transactions.", "status": "draft"}'
  ```

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "title": "Advanced Sequelize Concepts",
        "content": "Sequelize offers features like scopes, hooks, and transactions.",
        "userId": 1,
        "status": "draft",
        "createdAt": "2023-09-30T13:00:11.789Z",
        "updatedAt": "2023-09-30T14:05:45.123Z"
    }
    ```
  - **Description**: The response contains the updated post details, including the new `updatedAt` timestamp.

- **Error Handling**:
  - If the specified post ID does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Post not found"
      }
      ```

---

### **5. Delete a Post**

- **Endpoint**: `DELETE /posts/:id`
- **Description**: This route allows you to delete a post by specifying its ID in the URL. This action is permanent and will remove the post from the database.
- **Example cURL**:
  ```bash
  curl -X DELETE http://localhost:3000/posts/1
  ```

- **Expected Response**:
  - **Status**: `204 No Content`
  - **Description**: No content is returned upon successful deletion, indicating that the post has been removed from the database.

- **Error Handling**:
  - If the specified post ID does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Post not found"
      }
      ```

---

## Tag Routes

The **Tag Routes** manage tags that can be associated with posts. Each tag represents a specific category or topic, allowing for categorization of posts.

### **1. Create a Tag**

- **Endpoint**: `POST /tags`
- **Description**: This route creates a new tag in the database.
- **Request Body**:
  ```json
  {
      "name": "JavaScript"
  }
  ```
  - **`name`**: Required. The name of the tag (e.g., "JavaScript", "Node.js").

- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/tags -H "Content-Type: application/json" -d '{"name": "JavaScript"}'
  ```

- **Expected Response**:
  - **Status**: `201 Created`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "name": "JavaScript",
        "createdAt": "2023-09-30T14:10:56.789Z",
        "updatedAt": "2023-09-30T14:10:56.789Z"
    }
    ```

- **Error Handling**:
  - If the `name` field is missing, the response will be:
    - **Status**: `400 Bad Request`
    - **Response Body**:
      ```json
      {
          "error": "Tag name is required"
      }
      ```

---

### **2. Get All Tags**

- **Endpoint**: `GET /tags`
- **Description**: This route retrieves all tags from the database.
- **Example cURL**:
  ```bash
  curl http://localhost:3000/tags
  ```

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    [
        {
            "id": 1,
            "name": "JavaScript",
            "createdAt": "2023-09-30T14:10:56.789Z",
            "updatedAt": "2023-09-30T14:10:56.789Z"
        },
        {
            "id": 2,
            "name": "Node.js",
            "createdAt": "2023-09-30T14:12:34.123Z",
            "updatedAt": "2023-09-30T14:12:34.123Z"
        }
    ]
    ```

---

### **3. Update a Tag**

- **Endpoint**: `PUT /tags/:id`
- **Description**: This route allows you to update the name of an existing tag by specifying the tag ID in the URL.
- **Request Body**:
  ```json
  {
      "name": "Web Development"
  }
  ```

- **Example cURL**:
  ```bash
  curl -X PUT http://localhost:3000/tags/1 -H "Content-Type: application/json" -d '{"name": "Web Development"}'
  ```

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "id": 1,
        "name": "Web Development",
        "createdAt": "2023-09-30T14:10:56.789Z",
        "updatedAt": "2023-09-30T14:18:02.345Z"
    }
    ```

- **Error Handling**:
  - If the specified tag ID does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Tag not found"
      }
      ```

---

### **4. Delete a Tag**

- **Endpoint**: `DELETE /tags/:id`
- **Description**: This route allows you to delete a tag by specifying its ID. Once deleted, the tag will no longer be available for associating with posts.
- **Example cURL**:
  ```bash
  curl -X DELETE http://localhost:3000/tags/1
  ```

- **Expected Response**:
  - **Status**: `204 No Content`

- **Error Handling**:
  - If the specified tag ID does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Tag not found"
      }
      ```

---

## Post-Tag Association Routes

The **Post-Tag Association Routes** manage the Many-to-Many relationship between posts and tags, allowing you to add or remove tags from a post.

### **1. Add a Tag to a Post**

- **Endpoint**: `POST /post-tags/:postId/tags`
- **Description**: This route allows you to associate an existing tag with a post.
- **Request Body**:
  ```json
  {
      "tagId": 1
  }
  ```
  - **`tagId`**: Required. The ID of the tag you want to associate with the post.

- **Example cURL**:
  ```bash
  curl -X POST http://localhost:3000/posts/1/tags -H "Content-Type: application/json" -d '{"tagId": 1}'
  ```

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "message": "Tag added to post successfully"
    }
    ```

- **Error Handling**:
  - If either the post or tag ID does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Post or Tag not found"
      }
      ```

---

### **2. Remove a Tag from a Post**

- **Endpoint**: `DELETE /post-tags/:postId/tags`
- **Description**: This route allows you to remove an existing tag association from a post.
- **Request Body**:
  ```json
  {
      "tagId": 1
  }
  ```
  - **`tagId`**: Required. The ID of the tag to be removed from the post.

- **Example cURL**:
  ```bash
  curl -X DELETE http://localhost:3000/posts/1/tags -H "Content-Type: application/json" -d '{"tagId": 1}'
  ```

- **Expected Response**:
  - **Status**: `200 OK`
  - **Response Body**:
    ```json
    {
        "message": "Tag removed from post successfully"
    }
    ```

- **Error Handling**:
  - If either the post or tag ID does not exist, the response will be:
    - **Status**: `404 Not Found`
    - **Response Body**:
      ```json
      {
          "message": "Post or Tag not found"
      }
      ```