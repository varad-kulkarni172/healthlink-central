// server/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { aadharNumber, name, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ aadharNumber, name, password: hashedPassword, role });
        const token = generateToken(user.id);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login user and provide role-based response
exports.loginUser = async (req, res) => {
    const { aadharNumber, password } = req.body;
    try {
        const user = await User.findOne({ where: { aadharNumber } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user.id);
        res.json({
            user,
            token,
            redirectUrl: user.role === 'doctor' ? '/doctor/dashboard' : '/patient/normal-patient' || user.role === 'patient' ? '/patient/normal-patient' : '/docror/dashboard'
            //redirectUrl: user.role === 'patient' ? '/patient/normal-patient' : '/doctor/dashboard',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
