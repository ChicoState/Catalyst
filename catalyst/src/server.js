// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes');
require('dotenv').config();

const DB_URI = process.env.DB_URI;
const app = express();                      // Create Express Application
app.use(express.json());                    // Middleware setup

// Database connection
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));


// Bind routes
app.use('/api/user', authRoutes);

// Middleware

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



