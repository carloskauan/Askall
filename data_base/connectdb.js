const Sequelize = require('sequelize');
const connect = new Sequelize(
    'askme',
    'carloskauan',
    '15971597ck',
    {
        root: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = connect;