const User = require('../models/UserModel');
const Token = require('../models/RefreshModel');
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
            res.json({userToken});
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
    showAllUsers: function(req, res){
        try {
            const isVerified = jwt.verify(req.body.userToken.refreshToken, process.env.REFRESH_TOKEN_SECRET)
            res.json(isVerified);
            
        } catch (error) {
            res.json(error)
        }
    },
    test:async function (req,res){
        try {
            const username = req.body.username;
            const userPassword = req.body.password;
            const user = await User.findOne({username:username}).select('password').lean();

            if(!user){
              return  res.json({massage:"Invalid email or password"});
            }

            const isAccountValid = await bcrypt.compare(userPassword, user.password);
            if(!isAccountValid){
              return  res.json({massage:"Invalid email or password"});
            }
            const userData = {
                userId:user._id,
                userPassword:userPassword
            }
            const createdUserToken = jwt.sign({userData, expiresIn:'10s'}, process.env.TOKEN_SECRET)
            console.log(userData)
            const isAuthenticated = jwt.verify(createdUserToken, process.env.TOKEN_SECRET)
            // res.json({user_id:user._id,isAccountValid});
            console.log(req.header)
            res.json({createdUserToken});
        } catch (error) {
            console.log(error)
        }
       
    }
}

module.exports= userAuth;