const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class MedicalBill extends Model {}

MedicalBill.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'MedicalBill',
    tableName: 'medical_bills',
});

module.exports = { MedicalBill };
