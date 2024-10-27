const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

// Connect DataBase Connection using Mongoose URI
const connectToDB = async ()=>{
    await mongoose.connect(mongoURI)
   .then(()=>console.log('MongoDB Connected...'))
   .catch(err=>console.log(err, mongoose.MongooseError))
}

const closeDB = async ()=>{
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed...');
        
    } catch (err) {
        console.log(err, mongoose.MongooseError)
    }
}


module.exports = { connectToDB, closeDB };