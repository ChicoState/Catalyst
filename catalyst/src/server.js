// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from '../routes/authRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const DB_URI = process.env.DB_URI;

// Create Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware setup
app.use(express.json());


// Database connection
mongoose.connect(DB_URI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Use authRoutes middleware
app.use('/api', authRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
