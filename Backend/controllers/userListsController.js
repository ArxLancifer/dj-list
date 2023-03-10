const { default: mongoose, Mongoose } = require('mongoose');
const List = require('../models/ListModel');
const {Track} = require('../models/TrackModel')
const transformLinkToEmbed = require('../helpers/transformYoutubeLink');
userLists = {
    getLists: async function(req, res){
        const userId = req.params.user;
        if(!userId){
            return res.status(400).json("User not found");
        }
        
        const userLists = await List.find({user:userId})
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

            // console.log(await List.findById(listid).find({_id:trackToUpdated, {$in:'tracks'}}))
            // const query = await List.findById(listid).find({{ trackToUpdated: { "$in" : ["tracks"]}})
            const query = await List.findOneAndUpdate({ 'tracks._id': trackToUpdated },
            { 
                "$set": {[`tracks.$.1`]: {title:"asdasd", artist:"1231", album:"poasdpod",duration:"12312"}} 
              },
              { 
                "arrayFilters": [{ "outer._id": "tracks" }]
              }
            );
            console.log(query)
            // List.find({
            //     '_id': { $in: tracks.split(',') })
            // const x = await List.findById(list).findById({trackid:{$in: tracks}})
        //     // console.log(x);
        } catch (error) {
                console.log(error)
               return res.status(404).json({errorMessage:"Failed to update track"});
            }
            res.json({message:"Track updated successfully"});
    }
}

module.exports = userLists;