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
            type:Number,
            default: "Not available"
        },
        subGenre:{
            type:Number,
            default: "Not available"
        },
        duration:{
            type:String,
            default: "Not available"
        },
        BPM:{
            type:Number,
            default: "Not available"
        },
        youtubeLink:{
            type:String,
            default: "Not available"
        }

    },
        {
        timestamps:true,
        }
)


const Track = model("Track", TrackSchema);
module.exports = {Track, TrackSchema};