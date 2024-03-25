const mongoose = require("mongoose");

const connectToMongo = async (url) =>{
    try {
        await mongoose.connect(url);
        console.log("Connected to Mongo");
    } catch (error) {
        console.log("An error has occured : ", error.message);
    }
}

module.exports = connectToMongo;