const cloudinary = require('../middlawares/cloudinary');
const streamifier = require('streamifier');



accountSettings = {

    uploadAvatar: async function (req, res){
        const cloudResponse = await cloudinary.uploader.upload_stream( 
                    
            {
                folder:"dj-list-app",
                use_filename:true,
            },
            function(error, result) {
                console.log(error, result);
            }
            )

            streamifier.createReadStream(req.file.buffer).pipe(cloudResponse);
            console.log(cloudResponse)
        res.json("Multer test")
    }
   
}

module.exports = accountSettings;