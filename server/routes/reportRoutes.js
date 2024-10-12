const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken'); // Import JWT
const { Report } = require('../models/Report'); // Assuming you've created a Report model
const fs = require('fs');
const router = express.Router();

// Setup multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/reports'); // Folder to store uploaded reports
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized, token missing' });
    }

    // Assuming you are using JWT for authentication
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden, invalid token' });
        }
        req.user = user; // Store the user info from token
        next();
    });
};

// Fetch all reports
router.get('/', async (req, res) => {
    try {
        const reports = await Report.findAll();
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

// Upload a new report (with authentication)
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
    const { name } = req.body;
    const file = req.file;

    if (!file || !name) {
        return res.status(400).json({ error: 'File and report name are required' });
    }

    try {
        const newReport = await Report.create({
            name: name,
            filePath: file.path, // Save the file path in the database
        });
        res.status(201).json(newReport); // This sends the new report back to the client
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to upload report' });
    }
});

// Delete a report
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const report = await Report.findByPk(id);
        if (!report) return res.status(404).json({ error: 'Report not found' });

        // Delete the file from the server
        fs.unlinkSync(report.filePath);

        await report.destroy();
        res.status(200).json({ message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete report' });
    }
});


module.exports = router;
