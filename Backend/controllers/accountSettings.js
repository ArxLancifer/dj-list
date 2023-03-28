const formidable = require('formidable');
const cloudinary = require('../middlawares/cloudinary');
const path = require('path');
const fs = require('fs')

accountSettings = {

    uploadAvatar: async function (req, res){
        const form = formidable({ multiples: true}); //uploadDir: __dirname, keepExtensions:true
        form.parse(req, (err, fields, files)=>{
            if(err){
                next(err)
                return;
            }
        })
        form.on("fileBegin", function(name, file) {
            file.filepath = path.join(__dirname, file.originalFilename);
          });
        form.on('file', async (formname, file)=>{
            try {

            
                console.log(file);
                
                
                // const fileData = fs.createReadStream(file.filepath, ); //{ encoding: 'base64' }
                const cloudResponse = await cloudinary.uploader.upload(file.filepath, 
                    
                    {
                        folder:"dj-list-app",
                        use_filename:true,
                    })
                console.log(cloudResponse);
                fs.unlinkSync(file.filepath)

            } catch (error) {
                console.log(error)
            }
           
        })
        res.json("asd")
    }

}

module.exports = accountSettings;


// IMGUR API TESTING
// const requestConfig = {
//     method: 'post',
//   maxBodyLength: Infinity,
//     url: 'https://api.imgur.com/3/image',
//     headers: { 
//       'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`, 
//       ...data.getHeaders()
//     },
//     data : data
//   };

// const response = await axios(requestConfig)
// const responseData = response.data;