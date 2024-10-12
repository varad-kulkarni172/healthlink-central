// models/Medication.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Medication extends Model {}

Medication.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dosage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    frequency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Medication',
    tableName: 'medications',
});

module.exports = { Medication };
