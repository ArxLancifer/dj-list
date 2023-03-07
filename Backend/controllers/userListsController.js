const { default: mongoose, Mongoose } = require('mongoose');
const List = require('../models/ListModel');
const {Track} = require('../models/TrackModel')
userLists = {
    getLists: async function(req, res){
        const userId = req.params.user;
        if(!userId){
            return res.status(400).json("User not found");
        }
        
        const userLists = await List.find({user:"63f8d98aa07f43eca4390fb6"})
        .select('user name genre')
        .populate({path:'user', select:'username'})
        .lean();
        res.json(userLists);
    },
    createList: async function(req, res){

        const listName = req.body.name;
        const listGenre = req.body.genre;
        const listPublic = req.body.isPublic;
        const id = req.body.userId;

        const newList = new List({user:id, name:listName, genre:listGenre, public:listPublic});
        await newList.save()

        res.json("List created");
    },
    getTracks: async function(req, res){
        const listId = req.params.listid;
        const tracks = await List.findById(listId).select('tracks').lean();
        res.json(tracks);
    },
    pushTrack: async function(req, res){
        const listId = req.params.listid;
        const trackData = {title:"Where Are You", artist:"Sako Isoyan ", duration:"6:18", BPM:"100", youtubeLink:"https://www.youtube.com/embed/0Q76S9eOsco"}
        const newTrack = new Track(trackData)

        await List.findByIdAndUpdate(listId, {$push:{tracks:newTrack}})
        
        res.json({x:newTrack, y:"Track pushed to list"})
    }
}

module.exports = userLists;