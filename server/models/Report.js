const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Report extends Model {}

Report.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Report',
    tableName: 'reports',
});

module.exports = { Report };
