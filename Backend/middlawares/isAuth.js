const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next){
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
        // return res.json({refreshTokenIsVerified, userToken});
        if(tokenIsVerified) {
            return next();
        }
        
        if(refreshTokenIsVerified) {
            const newToken = jwt.sign(refreshTokenIsVerified, process.env.REFRESH_TOKEN_SECRET);
            const x = jwt.verify(newToken, process.env.REFRESH_TOKEN_SECRET)
            const refreshedToken = {
                ...userToken,
                createdUserToken:newToken
            }
            return res.json({userToken:refreshedToken});
        }

    if(!tokenIsVerified && !refreshTokenIsVerified){
        res.json("Redirected to homepage")
        res.redirect('/');   
    }
    } catch (error) {
        res.json(error)
    }
    
    

}


module.exports = isAuthenticated;