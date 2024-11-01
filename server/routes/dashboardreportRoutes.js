//dashboardreportRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken'); // Import JWT
const { dashboardReport } = require('../models/dashboardReport'); // Assuming you've created a Report model
const fs = require('fs');
const router = express.Router();

// Setup multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/dashboard_reports'); // Folder to store uploaded reports
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
        const dashboardreports = await dashboardReport.findAll();
        res.status(200).json(dashboardreports);
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
        const newReport = await dashboardReport.create({
            name: name,
            filePath: file.path,
        });
        res.status(201).json(newReport);
    } catch (err) {
        console.error('Upload Error:', err.message, err.stack); // Log detailed error info
        res.status(500).json({ error: 'Failed to upload report' });
    }
});


// Delete a report
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dashboardreport = await dashboardReport.findByPk(id);
        if (!dashboardreport) return res.status(404).json({ error: 'Report not found' });

        // Delete the file from the server
        fs.unlinkSync(dashboardreport.filePath);

        await dashboardreport.destroy();
        res.status(200).json({ message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete report' });
    }
});

module.exports = router;