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
    pushTrack: async function(req, res){
        const track = "Kapetanios Drake";
        
        const newTrack = {title:"asta na pane"};

        await List.updateOne({id:"63fe36d7b352f704d8d1af25"}, {$push:{tracks:newTrack}})
        
        res.send("Track pushed to list")
    }
}

module.exports = userLists;