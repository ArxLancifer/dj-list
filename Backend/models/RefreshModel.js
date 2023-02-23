const {Schema, model} = require('mongoose');

const TokenSchema = new Schema({
    refreshToken:{
        type:String,
        required:true
    },
    // createdAt: { type: Date, expires: 6000, default: Date.now },
   
    },
    {
        timestamps:true,
        // expireAfterSeconds:6000
    }
)

const Token = new model("Token", TokenSchema);
module.exports = Token;