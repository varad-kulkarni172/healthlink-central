const express = require('express');
//const { registerUser, loginUser } = require('../controllers/userController');
//const { protect } = require('../middleware/authMiddleware');
//const { roleCheck } = require('../middleware/roleMiddleware');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// JWT Secret - Replace this with a secure secret in production
const JWT_SECRET = '2eee15647999e341afd5dc8906b577c9fdbe204f043e05528f730f2bccd6f119b9e81af3ba16b464ca79c12b31ee6ebb28c9fa36efcdece1566d0b81ce16928f';

// Register route
router.post('/register', async (req, res) => {
    const { aadharNumber, name, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            aadharNumber,
            name,
            password: hashedPassword,
            role
        });
        res.status(201).json({ user });
    } catch (err) {
        console.error('Error creating user: ', err);
        res.status(500).json({ error: 'Error creating user' });
    }
});

function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}
// Login route
router.post('/login', async (req, res) => {
    const { aadharNumber, password } = req.body;

    try {
        const user = await User.findOne({ where: { aadharNumber } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid Aadhar Number or Password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid Aadhar Number or Password' });
        }

        // Debugging: Log the user role
        console.log(`User role: ${user.role}`);

        const token = generateToken(user);

        let redirectUrl;
        if (user.role === 'patient'  || user.role === 'Normal Patient') {
            redirectUrl = '/normal-patient';
        } else if (user.role === 'doctor' || user.role === 'Hospital Doc') {
            redirectUrl = '/dashboard';
        } else {
            return res.status(400).json({ error: 'Invalid user role' });
        }

        // Debugging: Log the redirectUrl before sending the response
        console.log(`Redirect URL before sending response: ${redirectUrl}`);

        // Respond with user data, token, and redirect URL
        return res.status(200).json({ token, redirectUrl });
    } catch (err) {
        console.error('Error occurred:', err);
        return res.status(500).json({ error: 'Error logging in' });
    }
});


module.exports = router;