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
                id: user.id,
                username: user.username // Include the username in the payload
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, username: user.username }); // Include the username in the response
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const updateUser = async (userId, updatedUserInfo) => {
    try {
        // Find the user by ID and update their information
        const user = await User.findByIdAndUpdate(userId, updatedUserInfo, { new: true });

        if (user) {
            return { success: true, user };
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, message: 'Internal server error' };
    }
};

router.post('/add-skill', async (req, res) => {
    const { email, skill } = req.body; // Extract the email and skill information from the request body

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create a new skill object based on the received skill data
        const newSkill = new Skill(skill);

        // Add the new skill to the user's skills array
        user.Skills.push(newSkill);

        // Save the updated user object
        await user.save();

        // Respond with a success message and the updated user object
        res.status(200).json({ success: true, message: 'Skill added successfully', user });
    } catch (error) {
        console.error('Error adding skill to user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/add-skill', async (req, res) => {
    const { email, skill } = req.body; // Extract the email and skill information from the request body

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create a new skill object based on the received skill data
        const newSkill = new Skill(skill);

        // Add the new skill to the user's skills array
        user.Skills.push(newSkill);

        // Save the updated user object
        await user.save();

        // Respond with a success message and the updated user object
        res.status(200).json({ success: true, message: 'Skill added successfully', user });
    } catch (error) {
        console.error('Error adding skill to user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;