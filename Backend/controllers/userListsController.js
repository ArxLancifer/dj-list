const { default: mongoose, Mongoose } = require('mongoose');
const List = require('../models/ListModel');
const {Track} = require('../models/TrackModel')
userLists = {
    getLists: async function(req, res){

        res.send("All Lists");

    },
    createList: async function(req, res){

        const listName = req.body.listName;
        const genre = req.body.genre;

        const newList = new List({name:listName, genre:genre})
        await newList.save()
        res.send("List created");
    },
    pushTrack: async function(req, res){
        const track = "Kapetanios Drake";
        
        const newTrack = {title:"asta na pane"};

        await List.updateOne({id:"63fe36d7b352f704d8d1af25"}, {$push:{tracks:newTrack}})
        
        res.send("Track pushed to list")
    }
}

module.exports = userLists;