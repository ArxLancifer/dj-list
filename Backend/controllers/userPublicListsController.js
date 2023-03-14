const List = require('../models/ListModel')

const publickLists = {
    getLists: async function(req, res){

        try {
            const publicLists = await List.find({isPrivate:false}).lean()
            return res.json(publicLists);
        } catch (error) {
            return res.json({errorMessage:"Unable to find"})
        }


    }
}

module.exports = publickLists;