const {Schema, model} = require('mongoose');

const NewUser = new Schema(
    {
        username:{
            type:String,
            unique:true
        },
        password:{
            type:String
        }
    },
    {timestamps:true}
)


model.exports = model("User", NewUser);