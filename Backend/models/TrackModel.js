const {Schema, model} = require('mongoose');

const TrackSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        artist:{
            type:String,
            required:true
        },
        album:{
            type:Number || "Not available"
        },
        subGenre:{
            type:Number || "Not available"
        },
        duration:{
            type:String || "Not available"
        },
        BPM:{
            type:Number || "Not available"
        },
        youtubeLink:{
            type:String || "Not available"
        }

    },
        {
        timestamps:true,
        }
)


const Track = model("Track", TrackSchema);
module.exports = Track;