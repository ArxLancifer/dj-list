const jwt = require('jsonwebtoken');

function createToken(user){
        const userData = {
            userId:user._id,
            userPassword:user.password
        }
        const createdUserToken = jwt.sign(userData,process.env.TOKEN_SECRET,{expiresIn:"20s"});
        const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET);
        return {createdUserToken, refreshToken};
    }
    


module.exports = createToken;