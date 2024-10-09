const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Use your database connection

// Define Appointment model
const Appointment = sequelize.define('Appointment', {
    name: { type: DataTypes.STRING, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('Pending', 'Postponed', 'Completed'), defaultValue: 'Pending' },
}, { timestamps: true });

module.exports = { Appointment };
