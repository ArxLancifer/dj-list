const List = require('../models/ListModel')

const publickLists = {
    getLists: async function(req, res){

        try {
            const publicLists = await List.find({isPrivate:false}).populate("user", "username userimage").select("-tracks");
            return res.json(publicLists);
        } catch (error) {
            console.log(error)
            return res.json({errorMessage:"Unable to find"})
        }


    },
    likeList: async function(req, res){
        try {
            const listToLike = req.body.listId;
            const userLikedList = req.body.userId;

            await List.updateOne({_id:listToLike}, {$addToSet:{usersLiked:userLikedList}})

            res.json({message:"List liked"})

        } catch (error) {
            console.log(error)
            res.json({errorMessage:"Something went wrong"})
        }
    },
    unlikeList: async function(req, res){

        try {
            const listToUnlike = req.body.listId;
            const userWhoUnliked = req.body.userId;

            await List.updateOne({_id:listToUnlike}, {$pull:{usersLiked: userWhoUnliked}})

            res.json({message:"List unliked"})

        } catch (error) {
            console.log(error)
            res.json({errorMessage:"Something went wrong"})
        }

    }
}

module.exports = publickLists;