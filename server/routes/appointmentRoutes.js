const express = require('express');
const { Appointment } = require('../models/Appointment');
const router = express.Router();

// Fetch all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Add a new appointment
router.post('/', async (req, res) => {
    const { name, time } = req.body;
    try {
        const newAppointment = await Appointment.create({ name, time, status: 'Pending' });
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add appointment' });
    }
});

// Postpone an appointment
router.patch('/postpone/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        
        appointment.status = 'Postponed';
        await appointment.save();
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to postpone appointment' });
    }
});

// Complete an appointment
router.patch('/complete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
        
        appointment.status = 'Completed';
        await appointment.save();
        res.status(200).json(appointment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to complete appointment' });
    }
});

// Delete a completed appointment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

        await appointment.destroy();
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

module.exports = router;
