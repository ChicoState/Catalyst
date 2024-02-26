// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes');
require('dotenv').config();

const DB_URI = process.env.DB_URI;

// Create Express application
const app = express();

// Middleware setup
app.use(express.json());

// Database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Use authRoutes middleware
app.use('/api/user', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
