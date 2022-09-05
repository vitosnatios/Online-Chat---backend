const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const {HOST, USER, PASSWORD, DATABASE} = process.env;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});
app.get('/getPosts', (req, res)=>{
    connection.connect(async err=>{
        try {
            const query = "SELECT * FROM posts";
            connection.query(query, (err, result, fields)=>{
                //tentar manter o número de mensagens do app em 150 e apagar depois disso
                if (result.length > 3500){
                    const numToRemove = result.length - 3500;
                    for(let i=numToRemove; i>1; i--){
                        const toRemove = result[i-2];
                        try {
                            connection.query(`DELETE FROM posts WHERE username = '${toRemove.username}'
                            AND imgurl = '${toRemove.imgurl}' 
                            AND content = '${toRemove.content}'
                            `, (err, remResult)=>{})
                        } catch(err){
                            console.log(err);
                        }
                    }
                }
                res.json({
                    data: result
                })
            })
        } catch (err) {
            console.log(err);
        }
    });
})

app.post('/addPost', (req, res)=>{
    try {
        const {username, imgurl, content} = req.body;
        connection.connect(err=>{
            const create = `INSERT INTO posts(username,imgurl,content)
            VALUES('${username}','${imgurl}','${content}')`;
            connection.query(create)
            return res.json({
                status: 'ok'
            })
        })
    } catch (err) {
        return res.json({
            status: 'err'
        })
    }
})

app.get('/health', (req, res)=>{
    res.sendStatus(200);
})

app.listen(port, ()=>{
    console.log(`Você se conectou na porta ${port}! 🚀`);
})