const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('healthlinkcentral', 'root', 'LemonLaw@1', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;