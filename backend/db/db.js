const mongoose = require('mongoose');

/* const mongoURI = "mongodb+srv://SayanM4455:TBIHP7grwRbHUzup@taskmanager.bh22q.mongodb.net/taskmanagerapp" */
const mongoURI = "mongodb://localhost:27017/taskmanagerapp?directConnection=true&readPreference=primary&tls=false"

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