// server/server.js
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const dashboardAppointment = require('./models/dashboardAppointment');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicalrecordsRoutes = require('./routes/medicalRecordRoutes');
const medicalBillRoutes = require('./routes/medicalBillRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dasboardreportRoutes = require('./routes/dashboardreportRoutes');
const dashboardappointmentRoutes = require('./routes/dashboardappointmentRoutes');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE']
    }
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

let appointments = [];

// Routes
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalrecordsRoutes);
app.use('/api/medical-bills', medicalBillRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard_reports', dasboardreportRoutes);
app.use('/api/dashboard_appointments', dashboardappointmentRoutes);

// Fetch appointments
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// Add new appointment
app.post('/api/appointments', (req, res) => {
    const newAppointment = { id: Date.now(), ...req.body, status: 'Pending' };
    appointments.push(newAppointment);
    res.status(201).json(newAppointment);

    // Emit event for new appointment
    io.emit('appointmentUpdated', { action: 'add', appointment: newAppointment });
});

// Postpone appointment
app.patch('/api/appointments/postpone/:id', (req, res) => {
    const appointmentId = parseInt(req.params.id, 10);
    const appointment = appointments.find(app => app.id === appointmentId);
    if (appointment) {
        appointment.status = 'Postponed';
        res.json(appointment);

        // Emit event for postponed appointment
        io.emit('appointmentUpdated', { action: 'postpone', appointment });
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
});

// Complete appointment
app.patch('/api/appointments/complete/:id', (req, res) => {
    const appointmentId = parseInt(req.params.id, 10);
    const appointment = appointments.find(app => app.id === appointmentId);
    if (appointment) {
        appointment.status = 'Completed';
        res.json(appointment);

        // Emit event for completed appointment
        io.emit('appointmentUpdated', { action: 'complete', appointment });
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
});

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
    const appointmentId = parseInt(req.params.id, 10);
    const index = appointments.findIndex(app => app.id === appointmentId);
    if (index !== -1) {
        const [deletedAppointment] = appointments.splice(index, 1);
        res.json(deletedAppointment);

        // Emit event for deleted appointment
        io.emit('appointmentUpdated', { action: 'delete', id: appointmentId });
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
});

// Database connection and server start
sequelize.sync({ force: false })
    .then(() => {
        const PORT = process.env.PORT || 5001;
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.authenticate()
    .then(() => {
        console.log('Successful MySQL Connection !');
    })
    .catch(() => {
        console.log('Failed to connect to MySQL');
    });
