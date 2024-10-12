const express = require('express');
const { Medication } = require('../models/Medication'); 
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const Medications = await Medication.findAll();
        res.status(200).json(Medications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch medications' });
    }
});


router.post('/', async (req, res) => {
    const { name, dosage, frequency, condition } = req.body;
    try {
        const newMedication = await Medication.create({ name, dosage, frequency, condition });
        res.status(201).json(newMedication);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add your medication' });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const medication = await Medication.findByPk(id);
        if (!medication) return res.status(404).json({ error: 'Medication not found' });

        await Medication.destroy();
        res.status(200).json({ message: 'Medication deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete medication' });
    }
});

module.exports = router;
    