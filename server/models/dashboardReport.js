//dashboardReport.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class dashboardReport extends Model {}

dashboardReport.init({
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
    modelName: 'dashboardReport',
    tableName: 'dashboard_reports',
});

module.exports = { dashboardReport };
