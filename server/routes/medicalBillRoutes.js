
const express = require('express');
const { MedicalBill } = require('../models/MedicalBill'); 
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const medicalBills = await MedicalBill.findAll();
        res.status(200).json(medicalBills);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch medical bills' });
    }
});


router.post('/', async (req, res) => {
    const { date, name, amount } = req.body;
    try {
        const newMedicalBill = await MedicalBill.create({ date, name, amount });
        res.status(201).json(newMedicalBill);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add medical bill' });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const medicalBill = await MedicalBill.findByPk(id);
        if (!medicalBill) return res.status(404).json({ error: 'Medical Bill not found' });

        await medicalBill.destroy();
        res.status(200).json({ message: 'Medical BIll deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete medical bill' });
    }
});

module.exports = router;
    