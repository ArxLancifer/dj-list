const { default: mongoose, Mongoose } = require('mongoose');
const List = require('../models/ListModel');
const {Track} = require('../models/TrackModel')
const transformLinkToEmbed = require('../helpers/transformYoutubeLink');
const User = require('../models/UserModel');
userLists = {
    getLists: async function(req, res){
        const userId = req.params.user;
        if(!userId){
            return res.status(400).json("User not found");
        }
        
        const userLists = await List.find({user:userId})
        .select('user name genre tracks')
        .populate({path:'user', select:'username'})
        .lean();
        res.json(userLists);
    },
    createList: async function(req, res){

        const listName = req.body.name;
        const listGenre = req.body.genre;
        const listPrivate = req.body.isPrivate;
        const listDescription = req.body.description || "There is no any description for this list";
        const id = req.body.userId;
        try {
            const newList = new List({user:id, name:listName, genre:listGenre, description:listDescription, isPrivate:listPrivate});
            await newList.save()
    
            res.status(200).json({message:"List created"});
            
        } catch (error) {
            res.status(400).json({errorMessage:"Unable to create list"})
        }
    },
    deleteList: async function(req, res){
            const listToDelete = req.params.listid;
            console.log(listToDelete)
            try {
                await List.findOneAndDelete({_id:listToDelete})
               return res.json({message:'List has been deleted'})
            } catch (error) {
              return res.json({errorMessage:"Something went wrong on list delete"})
            }
            
            
    },
    getTracks: async function(req, res){
        try {
            const listId = req.params.listid;
            const tracks = await List.findById(listId).select('tracks').lean();
            res.json(tracks);
        } catch (error) {
            console.log(error)
        }
    },
    pushTrack: async function(req, res){
        try {
            const listId = req.params.listid;
            const validEmbedLink = transformLinkToEmbed(req.body.youtubeLink)
            const trackData =
            {  
                title:req.body.title,
                artist:req.body.artist,
                album:req.body.album,
                youtubeLink:validEmbedLink,
                duration:req.body.duration,
                BPM:req.body.BPM,
                subGenre:req.body.subGenre
            }
            const newTrack = new Track(trackData)
    
            await List.findByIdAndUpdate(listId, {$push:{tracks:newTrack}})
            
            res.json("New track has been added"); 
        } catch (error) {
            res.json("Something went wrong. The track did not added")
        }
    },
    editTrack: async function(req, res){
        try {
            const listid = req.params.listid;
            const trackToUpdated = req.params.trackid;
            const updatedTrack = req.body.values;
            const validEmbedLink = transformLinkToEmbed(req.body.values.youtubeLink)
            const query = await List.updateOne(
                { "_id": listid, "tracks._id": trackToUpdated },
                { $set: {
                     "tracks.$.title": updatedTrack.title,
                     "tracks.$.artist": updatedTrack.artist,
                      "tracks.$.album": updatedTrack.album,
                      "tracks.$.subGenre": updatedTrack.subGenre,
                      "tracks.$.duration": updatedTrack.duration,
                      "tracks.$.BPM": updatedTrack.BPM,
                      "tracks.$.youtubeLink": validEmbedLink 
                    } }
            )
        } catch (error) {
                console.log(error)
               return res.status(404).json({errorMessage:"Failed to update track"});
            }
            res.json({message:"Track updated successfully"});
    },
    deleteTrack: async function(req, res){
        try {
            const listid = req.params.listid;
            const trackToDelete = req.params.trackid;
            // const query = await List.updateOne(
            //     {"_id":listid, "tracks._id":trackToDelete},
            //     {$pull:{tracks:{$elemMatch:{_id:trackToDelete}}}}
            //     )
                await List.updateOne(
                    {_id:listid}, // your query, usually match by _id
                    { $pull: { tracks: { _id:trackToDelete  } } }, // item(s) to match from array you want to pull/remove
                    { multi: true } // set this to true if you want to remove multiple elements.
                )
                
            // console.log(query)
           return res.json({message:"Track removed successfully"})
        } catch (error) {
            console.log(error)
            return res.json({errorMessage:"Track failed to be remove"})
        }
        

    },
    addFavorite: async function(req, res){
        try {
            const listId = req.body.listId;
            const userId = req.body.userId;
            await User.findByIdAndUpdate(userId,{$addToSet:{favoriteLists:listId}})
            res.json("List has been added to favorites");

        } catch (error) {
            res.json("Something wrong on favorites add");
        }
    },
    removeFavorite: async function(req, res){
        try {
            const listId = req.body.listId;
            const userId = req.body.userId;
            await User.findByIdAndUpdate(userId,{$pull:{favoriteLists:listId}})
            res.json("List has been removed to favorites");

        } catch (error) {
            res.json("Something wrong on favorites remove");
        }
    }
}

module.exports = userLists;