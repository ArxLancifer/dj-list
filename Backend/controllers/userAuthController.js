const User = require('../models/CreateUserModel');
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
    }
}

module.exports= userAuth;