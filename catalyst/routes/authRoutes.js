import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../src/models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
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
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }).populate('Skills');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                username: user.username,
                email: user.email,
                skills: user.Skills
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, username: user.username, email: user.email, skills: user.Skills });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/add-skill', async (req, res) => {
    const { email, skill } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        if (!user.Skills) {
            user.Skills = []; 
        }

        user.Skills.push(skill);

        await user.save();
        const payload = {
            user: {
                username: user.username,
                email: user.email,
                skills: user.Skills
            }
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, username: user.username, email: user.email, skills: user.Skills });
        });
        } catch (error) {
            console.error('Error saving skill to user:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
});


router.post('/edit-skill', async (req, res) => {
    const { email, editedSkill } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user || !user.Skills || user.Skills.length === 0) {
            return res.status(400).json({ msg: 'User or skills not found' });
        }
        //convet skill id's to string, then find the target skill index
        const index = user.Skills.findIndex(skill => String(skill._id) === String(editedSkill._id));

        //if the skill is not in the array, return an error
        if (index === -1) {
            return res.status(400).json({ msg: 'Skill not found' });
        }
        
        const updatedSkill = {
            ...user.Skills[index],
            SkillName: editedSkill.SkillName,
            Tasks: editedSkill.Tasks
        };
        //replace the old skill with the new one
        user.Skills[index] = updatedSkill;
        
        await user.save();
        
       // Respond with the updated user object 
       const payload = {
        user: {
            username: user.username,
            email: user.email,
            skills: user.Skills
        }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err;
        res.json({ token, username: user.username, email: user.email, skills: user.Skills });
    });
    } catch (error) {
        console.error('Error saving skill to user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/delete-skill', async (req, res) => {
    const { email, skillId } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user || !user.Skills || user.Skills.length === 0) {
            return res.status(400).json({ msg: 'User or skills not found' });
        }

        const index = user.Skills.findIndex(skill => String(skill._id) === skillId);

        if (index === -1) {
            return res.status(400).json({ msg: 'Skill not found' });
        }

        user.Skills.splice(index, 1);

        await user.save();

               // Respond with the updated user object 
        const payload = {
            user: {
                username: user.username,
                email: user.email,
                skills: user.Skills
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, username: user.username, email: user.email, skills: user.Skills });
        });
        } catch (error) {
            console.error('Error deleting skill:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });

export default router;
