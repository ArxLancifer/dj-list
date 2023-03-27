const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const mongodDB = require('./config/mongoDB');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'config/.env'});
const PORT = process.env.PORT;
const userAuth = require('./routes/userAcount');
const userPosts = require('./routes/userPosts');
const userLists = require('./routes/userLists');
const publickLists = require('./routes/publucLists');
const formidable = require('formidable');
const axios = require('axios');
const FormData = require('form-data');
const User = require('./models/UserModel');

app.use(cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
mongodDB();



app.post("/gatekeeper", async (req,res)=>{
    const token = req.body.token;
    try {
        const userIsAuth = jwt.verify(token, process.env.TOKEN_SECRET, (err, result)=>{
            if(err) return null;
            return result;
        })
        if(userIsAuth){
            const userFavoriteLists = await User.findById(userIsAuth._id).select('favoriteLists createdAt -_id');
           return res.json({id:userIsAuth._id, name:userIsAuth.username, favoriteLists:userFavoriteLists, isAuth:true, accountSince:userFavoriteLists.createdAt});
        }else{
           return res.status(403).json("Unauthorized user!");
        }
    } catch (error) {
        console.log(error)
    }
})

app.use('/user', userAuth);
app.use('/userlist', userPosts);
app.use('/userlists', userLists);
app.use('/publiclists', publickLists);

app.post('/uploadimage', async (req, res)=>{
    console.log("Request upload file")
    const form = formidable({ multiples: true,  }); //uploadDir: __dirname, keepExtensions:true
    form.parse(req, (err, fields, files)=>{
        if(err){
            next(err)
            return;
        }
      

       
    })
    form.on('file', async (formname, file)=>{
        try {
            const fileData = fs.createReadStream(file.filepath, ); //{ encoding: 'base64' }
            const data = new FormData()
            data.append('image', fileData);
            const requestConfig = {
                method: 'post',
              maxBodyLength: Infinity,
                url: 'https://api.imgur.com/3/image',
                headers: { 
                  'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`, 
                  ...data.getHeaders()
                },
                data : data
              };
    
            const response = await axios(requestConfig)
            const responseData = response.data;
            console.log(responseData);
        } catch (error) {
            console.log(error)
        }
       
    })
    res.json("asd")
})



app.listen(PORT, ()=>{
    console.log("Server is running on port "+ PORT)
})