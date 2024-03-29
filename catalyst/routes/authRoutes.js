import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../src/models/User.js';

// This file defines endpoints for user registration and login
const router = express.Router();

router.post('/register', async (req, res) => {

    const { username, email, password } = req.body;
    
    try {
        console.log('Received registration request:', req.body);

        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User with this email already exists:', email);
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user object to the database
        const savedUser = await newUser.save();

        console.log('User registered successfully:', savedUser);

        // Respond with a success message and the saved user object
        res.status(201).json({ message: 'User registered successfully' });
     
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user in the database by email
        let user = await User.findOne({ email });
        

        // If the user is not found, return an error
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If the passwords don't match, return an error
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // If the credentials are valid, create a JSON Web Token (JWT) for authentication
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;