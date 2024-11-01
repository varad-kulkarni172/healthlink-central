// server/server.js
const express = require('express');
const http = require('http');  // Import http to create the server
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const socketIo = require('socket.io');  // Import Socket.IO
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicalrecordsRoutes = require('./routes/medicalRecordRoutes');
const medicalBillRoutes = require('./routes/medicalBillRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dasboardreportRoutes = require('./routes/dashboardreportRoutes');
const dashboardappointmentRoutes = require('./routes/dashboardappointmentRoutes');
const { dashboardAppointment } = require('./models/dashboardAppointment');


// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);  // Create the HTTP server
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",  // Replace with the correct frontend origin
        methods: ["GET", "POST"]
    }
});  // Attach Socket.IO to the server

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));  // Serve the 'uploads' folder

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

// Socket.IO event handling
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.post('/api/dashboard_appointments', async (req, res) => {
    try {
        const newAppointment = await dashboardAppointment.create(req.body);
        const date = new Date().toISOString().split('T')[0];
        const count = await dashboardAppointment.count();

        io.emit('appointmentUpdate', { date, count });

        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// Database connection and server start
sequelize.sync({ force: false })
    .then(() => {
        const PORT = process.env.PORT || 5001;
        server.listen(PORT, () => {  // Start the server with the http server
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
