    // server/controllers/userController.js
    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    };

    exports.registerUser = async (req, res) => {
        const { aadharNumber, name, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ aadharNumber, name, password: hashedPassword });
            const token = generateToken(user.id);
            res.status(201).json({ user, token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    exports.loginUser = async (req, res) => {
        const { aadharNumber, password } = req.body;
        try {
            const user = await User.findOne({ where: { aadharNumber } });
            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = generateToken(user.id);
            res.json({ user, token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };