const express = require('express');
const app = express();
const mongodDB = require('./config/mongoDB')
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'config/.env'});
const PORT = process.env.PORT;
const userAuth = require('./routes/userAcount');
const userPosts = require('./routes/userPosts');
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

app.use('/login', userAuth);
app.use('/user', userPosts);

app.listen(PORT, ()=>{
    console.log("Server is running on port "+ PORT)
})