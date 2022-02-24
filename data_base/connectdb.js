const Sequelize = require('sequelize');
const connect = new Sequelize(
    'd5q1a96tf5kk69',
    'dydsmpudcwivqp',
    'f1dfd7fc18fccaed308b810a43cab8746ed214cc63b060212b74207a4c504ec5',
    {
        root: 'c2-34-204-127-36.compute-1.amazonaws.com',
        dialect: 'postgres'
    }
);

module.exports = connect;
