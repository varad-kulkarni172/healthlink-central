const {  Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class MedicalRecord extends Model {}

MedicalRecord.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    result: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'MedicalRecord',
    tableName: 'medical_records',
});

module.exports = { MedicalRecord };
