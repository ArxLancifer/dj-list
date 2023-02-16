const NewUser = require('../models/NewUser');
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
      const user = new NewUser({name:"asdasd",password:"asdasd"});
      await user.save();
        try {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = {name: req.body.name, password: hashedPassword}
            // users.push(user);
            console.log("asdasda")
            res.json("asdsadas");
            // console.log(users)
        } catch (error) {
          res.send("")  
        }
    },
    showAllUsers: function(res, res){
        res.send(users)
    }
}

module.exports= userAuth;