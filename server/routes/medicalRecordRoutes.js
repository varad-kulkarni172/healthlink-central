// routes/medicalRecordRoutes.js
const express = require('express');
const { MedicalRecord } = require('../models/MedicalRecord'); // Assuming you've created a model for MedicalRecord
const router = express.Router();

// Fetch all medical records
router.get('/', async (req, res) => {
    try {
        const medicalRecords = await MedicalRecord.findAll();
        res.status(200).json(medicalRecords);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch medical records' });
    }
});

// Add a new medical record
router.post('/', async (req, res) => {
    const { date, name, result } = req.body;
    try {
        const newMedicalRecord = await MedicalRecord.create({ date, name, result });
        res.status(201).json(newMedicalRecord);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add medical record' });
    }
});

// Delete a medical record
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const medicalRecord = await MedicalRecord.findByPk(id);
        if (!medicalRecord) return res.status(404).json({ error: 'Medical Record not found' });

        await medicalRecord.destroy();
        res.status(200).json({ message: 'Medical Record deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete medical record' });
    }
});

module.exports = router;
    