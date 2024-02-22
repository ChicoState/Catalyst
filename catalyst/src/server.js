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

// Additional routes and middleware can be added here...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Middleware
app.use('/api/user', authRoutes);

// server.js or routes/auth.js

const router = express.Router();

// Define route for user registration
router.post('/register', (req, res) => {
    // Handle user registration logic here
});

module.exports = router;


