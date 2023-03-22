const {Schema, model} = require('mongoose');
const {Track, TrackSchema} = require('./TrackModel');

const TrackType = {
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
            type:String,
            default: "Not available"
        },
        youtubeLink:{
            type:String,
            default: "Not available"
        }
    }


    const CommentSchema = new Schema({
            user:{ 
                type:Schema.Types.ObjectId,
                ref:'User',
                required:true,
            },
            commentText:String,
            
    },{_id:false})

const ListSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    name:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    isPrivate: {
        type:Boolean,
        default:false,
    },
    tracks:[{
        type:TrackType
    }],
    usersLiked:[{
        type:String
    }],
    comments:[{
        type:CommentSchema
    }]

},
    {
    timestamps:true,
    }
)

const List = model("List", ListSchema);
module.exports = List;
