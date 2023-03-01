const jwt = require('jsonwebtoken');

function createToken(user){
        const createdUserToken = jwt.sign(user,process.env.TOKEN_SECRET,{expiresIn:"3600s"});
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        return {createdUserToken, refreshToken};
    }
    


module.exports = createToken;