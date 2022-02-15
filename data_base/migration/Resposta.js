const Sequelize = require('sequelize');
const connect = require('../connectdb.js');

const Resposta = connect.define('resposta',{
    conteudo: {
        type: Sequelize.TEXT , 
        allowNull: false
    },
    perguntaID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false})
    .then(()=>{console.log("Tabela de resposta criada com sucesso....")});

module.exports = Resposta;