// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Create Express application
const app = express();

// Middleware setup
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Additional routes and middleware can be added here...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const authRoutes = require('./routes/authRoutes');

// Middleware
app.use('/api/user', authRoutes);

// server.js or routes/auth.js
const express = require('express');
const router = express.Router();

// Define route for user registration
router.post('/register', (req, res) => {
    // Handle user registration logic here
});

module.exports = router;


