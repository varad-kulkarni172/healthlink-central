const express = require('express');
const { dashboardAppointment } = require('../models/dashboardAppointment');
const router = express.Router();
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    console.log('Client connected to socket');

    // Listen for a new appointment creation
    socket.on('newAppointment', (data) => {
        io.emit('appointmentUpdate', data); // Broadcast to all clients
    });
});

// Endpoint for creating appointments
app.post('/api/dashboard_appointments', async (req, res) => {
    try {
        const newAppointment = await dashboardAppointment.create(req.body);
        const date = new Date().toISOString().split('T')[0]; // Format date for today
        const count = await dashboardAppointment.count(); // Get total appointment count

        io.emit('appointmentUpdate', { date, count }); // Emit the real-time update
        
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

server.listen(5000, () => console.log('Server running on port 5000'));


// Fetch all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await dashboardAppointment.findAll();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Add a new appointment
router.post('/', async (req, res) => {
    const { name, time } = req.body;
    try {
        const newAppointment = await dashboardAppointment.create({ name, time, status: 'Pending' });
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add appointment' });
    }
});

// Postpone an appointment
router.patch('/postpone/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await dashboardAppointment.findByPk(id);
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
        const appointment = await dashboardAppointment.findByPk(id);
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
        const appointment = await dashboardAppointment.findByPk(id);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

        await appointment.destroy();
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

module.exports = router;
