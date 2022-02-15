const sequelize = require('sequelize');
const connect = require('../connectdb.js')

const Pergunta = connect.define('pergunta', {
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    pergunta:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{console.log('Tabela criada com sucesso...')});

module.exports = Pergunta;