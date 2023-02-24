const User = require('../models/UserModel');
const Token = require('../models/TokenModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/createToken');

const userAuth = {
    loginUser: async function(req, res){
        const user = await User.findOne({email:req.body.email}).lean();
        if(!user){
         return res.json("Invalid email or password");
        }
        try {
          if(await bcrypt.compare(req.body.password, user.password)){
         const userToken = createUserToken(user);
         const refreshToken = new Token({refreshToken:userToken.refreshToken});
         await refreshToken.save();
            res.json({userToken, username:user.username});
          }else {
            res.json("Wrong account");
          }

        } catch (error) {
           res.send(error); 
        }
    },
    signUp:async function(req, res){
        
        try {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = {username: req.body.username,email:req.body.email, password: hashedPassword}
            console.log(user)
            const newUser = new User(user);
            await newUser.save();
            res.json("Account created succesfully")
        } catch (error) {
            console.log(error)
            res.send("Something went wrong")  
        }
    },
    logOut:async function(req,res){
        try {
            const userToken = req.body.userToken;
            await Token.findOneAndDelete({refreshToken:userToken.refreshToken});
            res.send("Redirect to homepage");
        } catch (error) {
            console.log(error)
        }
    }
       
}

module.exports= userAuth;