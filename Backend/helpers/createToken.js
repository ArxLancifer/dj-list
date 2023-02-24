const jwt = require('jsonwebtoken');

function createToken(user){
        // const userData = {
        //     userId:user._id,
        //     userPassword:user.password
        // }
        const createdUserToken = jwt.sign(user,process.env.TOKEN_SECRET,{expiresIn:"20s"});
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        // const vcreatedUserToken = jwt.verify(createdUserToken, process.env.TOKEN_SECRET)
        // const vrefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // console.log(user);
        // console.log(vcreatedUserToken)
        // console.log(vrefreshToken)
        return {createdUserToken, refreshToken};
    }
    


module.exports = createToken;