const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebok";

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connection successfully Created");
    })
}

module.exports = connectToMongo;