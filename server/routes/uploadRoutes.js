    // server/routes/uploadRoutes.js
    const express = require('express');
    const upload = require('../middleware/uploadMiddleware');
    const { protect } = require('../middleware/authMiddleware');
    const router = express.Router();

    router.post('/', protect, upload.single('file'), (req, res) => {
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });

    module.exports = router;