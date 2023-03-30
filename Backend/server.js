const express = require('express');
const app = express();
const cors = require('cors');
const mongodDB = require('./config/mongoDB');
const jwt = require('jsonwebtoken');
require('dotenv').config({path:'config/.env'});
const PORT = process.env.PORT;
const userAuth = require('./routes/userAcount');
const userPosts = require('./routes/userPosts');
const userLists = require('./routes/userLists');
const publickLists = require('./routes/publucLists');
const accountSettings = require('./routes/accountSettings');
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
            const userFavoriteLists = await User.findById(userIsAuth._id).select('favoriteLists createdAt userimage -_id');
           return res.json({id:userIsAuth._id, name:userIsAuth.username, favoriteLists:userFavoriteLists, isAuth:true, accountSince:userFavoriteLists.createdAt, userimage:userIsAuth.userimage});
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
app.use('/accountsettings', accountSettings);



app.listen(PORT, ()=>{
    console.log("Server is running on port "+ PORT)
})