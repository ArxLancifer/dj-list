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


    }
}

module.exports = publickLists;