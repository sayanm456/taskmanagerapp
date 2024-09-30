// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://SayanM4455:TBIHP7grwRbHUzup@taskmanager.bh22q.mongodb.net/taskmanagerapp"

const connectToDB = ()=>{
    mongoose.connect(mongoURI)
   .then(()=>console.log('MongoDB Connected...'))
   .catch(err=>console.log(err))
}


// eslint-disable-next-line no-undef
module.exports = connectToDB;