// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://SayanM:ALzOdlmA3HQ6F1Vl@task-manager.bh22q.mongodb.net/"

const connectToDB = ()=>{
    mongoose.connect(mongoURI)
   .then(()=>console.log('MongoDB Connected...'))
   .catch(err=>console.log(err))
}


// eslint-disable-next-line no-undef
module.exports = connectToDB;