const formidable = require('formidable');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs')
accountSettings = {

    uploadAvatar: function (req, res){
        console.log("Request upload file")
        const form = formidable({ multiples: true,  }); //uploadDir: __dirname, keepExtensions:true
        form.parse(req, (err, fields, files)=>{
            if(err){
                next(err)
                return;
            }
        })
        form.on('file', async (formname, file)=>{
            try {
                const fileData = fs.createReadStream(file.filepath, ); //{ encoding: 'base64' }
                const data = new FormData()
                data.append('image', fileData);
                const requestConfig = {
                    method: 'post',
                  maxBodyLength: Infinity,
                    url: 'https://api.imgur.com/3/image',
                    headers: { 
                      'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`, 
                      ...data.getHeaders()
                    },
                    data : data
                  };
        
                const response = await axios(requestConfig)
                const responseData = response.data;
                console.log(responseData);
            } catch (error) {
                console.log(error)
            }
           
        })
        res.json("asd")
    }

}

module.exports = accountSettings;