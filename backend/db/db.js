const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://SayanM4455:TBIHP7grwRbHUzup@taskmanager.bh22q.mongodb.net/taskmanagerapp"
const mongoURI = "mongodb://localhost:27017/taskmanagerapp?directConnection=true&readPreference=primary&tls=false"


const connectToDB = async ()=>{
    await mongoose.connect(mongoURI)
   .then(()=>console.log('MongoDB Connected...'))
   .catch(err=>console.log(mongoose.MongooseError))
}


module.exports = connectToDB;