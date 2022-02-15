const express = require('express');
const app = express();
const port = process.env.PORT || 7070;
const bodyParser = require('body-parser');
const connect = require('./data_base/connectdb.js')
const Pergunta = require('./data_base/migration/Pergunta.js');
const Resposta = require("./data_base/migration/Resposta.js");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

connect.authenticate()
       .then(()=>{
            console.log('Conexão realizada com sucesso...')
        })
        .catch((error)=>{
            console.log(`Conexão não realizada. ERRO => ${error}`);
        })

app.get('/',(req,res)=>{
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]})
        .then(registros =>{
            console.log(registros);
            res.render('index.ejs',{
                resultado: registros
            })
        })
});
app.get('/perguntar',(req,res)=>{res.render('perguntar.ejs');})

app.post('/salvarpergunta',(req, res)=>{
    var titulo = req.body.titulo;
    var pergunta = req.body.pergunta;
    Pergunta.create({
        titulo: titulo,
        pergunta: pergunta
    }).then(()=>{
        res.redirect('/');
    })
});

app.get('/pergunta/:id',(req, res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta=>{
        if(pergunta!=undefined){
            Resposta.findAll({raw: true, where: {perguntaID: pergunta.id}, order: [['createdAt', 'DESC']]})
            .then(respostas=>{
                console.log(respostas);
                res.render('pergunta.ejs',{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        }else{res.redirect('/')}
   })
}); 


app.post('/sendresposta',(req, res)=>{
    var conteudo = req.body.conteudo;
    var perguntaID =  parseInt(req.body.perguntaID);
    Resposta.create({
        conteudo: conteudo,
        perguntaID: perguntaID
    }).then(()=>{
        res.redirect(`/pergunta/${perguntaID}`);
    });
});

try{
    app.listen(port,()=>{console.log(`Servidor rodando na porta ${port}`)});
}catch(error){
    console.log(`Erro ao tentar rodar o servidor. Erro => ${error}`);
};