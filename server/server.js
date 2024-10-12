// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicalrecordsRoutes = require('./routes/medicalRecordRoutes');
const medicalBillRoutes = require('./routes/medicalBillRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Load environment variables
dotenv.config();

const app = express();

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



// Database connection and server start
sequelize.sync({ force: false })
    .then(() => {
        app.listen(5000, () => {
            console.log(`Server is running on port 5000`);
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
