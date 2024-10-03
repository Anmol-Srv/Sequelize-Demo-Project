const express = require('express');
const { sequelize } = require('./models');
require('dotenv').config();  // Load environment variables

const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

// Error handling middleware
app.use(errorMiddleware);

// Routes
app.use('/users', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/posts', postRoutes);
app.use('/tags', tagRoutes);


// Middleware to handle JSON request payloads
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Sequelize Demo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
