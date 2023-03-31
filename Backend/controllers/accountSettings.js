const cloudinary = require('../middlawares/cloudinary');
const streamifier = require('streamifier');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

accountSettings = {

    uploadAvatar: async function (req, res){
        

        try {
            const userData = jwt.verify(req.body.userToken ,process.env.TOKEN_SECRET, function(err, result){
                if (err) return null;
                return result;
            });
            if(userData){
                const userID = userData._id;
                // Cloudinary buffer upload
                if(!req.file){
                    return res.status(400).json({errorMessage:"File is required"})
                }
               
                const cloudResponse = await cloudinary.uploader.upload_stream(        
                    {
                        folder:"dj-list-app",
                        use_filename:true,
                        
                    },
                    async function(error, result) {
                        // console.log(error, result);
                        // Update user avatar
                       const user = await User.findByIdAndUpdate(userID, {userimage:result.url})
                    }
                    )
                    streamifier.createReadStream(req.file.buffer).pipe(cloudResponse);
    
            }else  res.status(400).json({errorMessage:"Unauthorized user"})
            console.log(userData)
           
        } catch (error) {
            console.log(error)
           return res.status(400).json({errorMessage:"Something went wrong, try to login again"})
        }
        
        
        res.json("Multer test")
    }
   
}

module.exports = accountSettings;


// const userID = userData._id;
//             console.log(userID)
//             try {
//                 const user = await User.find({_id:userID})
//                 console.log(user)
//             } catch (error) {
                
//             }