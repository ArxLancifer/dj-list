const {Schema, model} = require('mongoose');

const TrackSchema = new Schema(
    {
        play:{
            type:String,
            default:""
        },
        title:{
            type:String,
            required:true
        },
        artist:{
            type:String,
            required:true
        },
        album:{
            type:String,
            default: "Not available"
        },
        subGenre:{
            type:String,
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