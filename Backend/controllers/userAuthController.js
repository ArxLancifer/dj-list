const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = [];

const userAuth = {
    loginUser: async function(req, res){
        console.log(req.body)

        const user = users.find(user => user.name == req.body.name);
        if(user == null){
         return res.json("Not match user");
        }
        try {
          if(await bcrypt.compare(req.body.password, user.password)){
            res.send("You are logged in");
          }else {
            res.send("Wrong account");
          }

        } catch (error) {
           res.send("Bad request"); 
        }
    },
    signUp:async function(req, res){
        
        try {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = {username: req.body.username, password: hashedPassword}
            console.log(user)
            const newUser = new User(user);
            await newUser.save();
            res.json("Account created succesfully")
        } catch (error) {
            console.log(error)
            res.send("Something went wrong")  
        }
    },
    showAllUsers: function(res, res){
        res.send(users)
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
            const createdUserToken = jwt.sign({userData, expiresIn:'1h'}, process.env.TOKEN_SECRET)
            console.log(userData)
            const isAuthenticated = jwt.verify(createdUserToken, process.env.TOKEN_SECRET)
            // res.json({user_id:user._id,isAccountValid});
            res.json({createdUserToken});
        } catch (error) {
            console.log(error)
        }
       
    }
}

module.exports= userAuth;