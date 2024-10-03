const { sequelize } = require('../models');

async function syncModels() {
    try {
        await sequelize.sync({ force: true }); // This will drop the tables if they already exist and recreate them
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing the models:', error);
    }
}

syncModels();
