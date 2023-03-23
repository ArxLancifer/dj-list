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

    },
    listComments: async function(req, res){
        const listId = req.params.listid;
        try {
            const comments = await List.findById(listId).select('comments').populate({path:'comments.user', select:'username'})
            res.json(comments)
        } catch (error) {
            console.log(error)
        }
    },
    addComment: async function(req, res){
        const listId = req.params.listid;
        const userId = req.body.userId;
        const userComment = req.body.userComment;
        try {
            const comments = await List.findByIdAndUpdate(listId, {$push:{comments:{user:userId, commentText:userComment}}})
            console.log(comments)
            res.json("commented")
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports = publickLists;