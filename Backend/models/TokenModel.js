
const {Schema, model} = require('mongoose');

const TokenSchema = new Schema(
    {
        refreshToken:{
        type:String,
        required:true
        },

    },
        {
        timestamps:true,
        }
)


const Token = model("Token", TokenSchema);
module.exports = Token;