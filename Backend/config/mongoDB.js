const mongoose = require('mongoose')

const connectMongo = async function () {
    try {
        await mongoose.connect(process.env.DB_STRING)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectMongo;