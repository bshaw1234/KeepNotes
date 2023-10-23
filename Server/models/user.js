const mongoose= require("mongoose")

const data= new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    content:{
        type: Array,
        default: [],
        items: {
            id:{
                type: Number
            },
            title: {
                type: String,
                required: true
            },
            mesg: {
                type: String,
                required: true
            }
        }
    }
});

const user = mongoose.model('user',data)
module.exports= user;

