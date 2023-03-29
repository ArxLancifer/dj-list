const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        userimage:{
            type:String,
        },
        favoriteLists:[{
            type:Schema.Types.ObjectId,
            ref:'List',
        }]
    },
    {timestamps:true}
)


const User = model("User", UserSchema);
module.exports = User;