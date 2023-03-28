const cloudinary = require('../middlawares/cloudinary');
const path = require('path');
const fs = require('fs')

accountSettings = {

    uploadAvatar: async function (req, res){
        console.log(req.file);
        res.json("Multer test")
    }
   
}

module.exports = accountSettings;