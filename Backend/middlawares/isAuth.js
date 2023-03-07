const jwt = require('jsonwebtoken');
const Token = require('../models/TokenModel');
async function isAuthenticated(req, res, next){
    const userToken = req.body.userToken;
    

    try {
        const tokenIsVerified = jwt.verify(userToken.createdUserToken, process.env.TOKEN_SECRET, function(err, result){
            if (err) return null;
            return result;
        });
        const refreshTokenIsVerified = jwt.verify(userToken.refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err, result){
            if (err) return null;
            return result;
        });
        if(tokenIsVerified) {
            return next();
        }
        const refreshTokenIsValid = await Token.findOne({refreshToken:userToken.refreshToken})
        if(refreshTokenIsVerified && refreshTokenIsValid) {
            const newToken = jwt.sign(refreshTokenIsVerified, process.env.TOKEN_SECRET,{expiresIn:"3600s"});
            const refreshedToken = {
                ...userToken,
                createdUserToken:newToken
            }
            return res.json({userToken:refreshedToken});
        }

    
        res.json("Redirected to logIn page")
        // res.redirect('/');   
    
    } catch (error) {
        res.json(error)
    }
    
    

}


module.exports = isAuthenticated;