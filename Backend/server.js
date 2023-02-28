const express = require('express');
const app = express();
const cors = require('cors');
const mongodDB = require('./config/mongoDB')
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'config/.env'});
const PORT = process.env.PORT;
const userAuth = require('./routes/userAcount');
const userPosts = require('./routes/userPosts');
const userLists = require('./routes/userLists');

app.use(cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
mongodDB();

const users = [];

const dummyPosts = [
    {
        username:"Kyle",
        title:'Post 1'
    },
    {
        username:"Anestis",
        title:'Post 2'
    },
    {
        username:"Teo",
        title:'Post 3'
    }
    
]

app.use('/user', userAuth);
app.use('/userlist', userPosts);
app.use('/user/userlists', userLists);
const x = jwt.sign({name:"Anestis",email:"anestis@gmail.com"}, process.env.TOKEN_SECRET);

app.post('/jwttestlogin', (req, res)=>{
    const username = req.body.username;
    const user ={name:username}

    const createdUserToken = jwt.sign({user, exp:"1h"}, process.env.TOKEN_SECRET)
    res.json(createdUserToken);
})
app.get('/jwttestauth', (req,res)=>{
    const userToken = req.body.token;
    const authTicket = jwt.verify(userToken, process.env.TOKEN_SECRET);
    res.json(authTicket);
})

app.listen(PORT, ()=>{
    console.log("Server is running on port "+ PORT)
})