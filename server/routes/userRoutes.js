    // server/routes/userRoutes.js
    const express = require('express');
    const { registerUser, loginUser } = require('../controllers/userController');
    const { protect } = require('../middleware/authMiddleware');
    const { roleCheck } = require('../middleware/roleMiddleware');
    const router = express.Router();

    router.post('/register', registerUser);
    router.post('/login', loginUser);
    router.get('/profile', protect, (req, res) => {
        res.json(req.user);
    });
    router.get('/emergency', protect, roleCheck(['admin', 'doctor']), (req, res) => {
        res.json({ message: 'Emergency access granted' });
    });

    module.exports = router;