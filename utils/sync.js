// Importing the sequelize instance from the models directory.
// Sequelize is an ORM (Object-Relational Mapper) that allows us to interact with the database using JavaScript code.
const { sequelize } = require('../models');

// Defining an asynchronous function to synchronize our models with the database.
// This function will create tables for each model in the database, based on their definitions.
async function syncModels() {
    try {
        // Synchronize all defined models with the database.
        // The `force: true` option drops tables first if they already exist, and then recreates them.
        // This is useful in development to reset the database structure if changes are made to the models.
        await sequelize.sync({ force: true });

        // Log a success message to indicate that the database and tables have been created successfully.
        console.log('Database & tables created!');
    } catch (error) {
        // If there is any error during the synchronization process, it will be caught here.
        // This error message will help in debugging issues related to database syncing.
        console.error('Error syncing the models:', error);
    }
}

// Calling the syncModels function to initiate the synchronization process.
// Running this function will create or reset the database tables, based on the model definitions.
syncModels();
