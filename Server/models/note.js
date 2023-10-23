const mongoose= require("mongoose")
// const userController = require('./controller/user')
// const idd= require('../controller/user')



const msg= new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    mesg:{
        type: String,
        required: true
    }
})
// console.log(idd.getid)
// console.log("hi")
const name='1';
const note = mongoose.model(name,msg)
module.exports= note;