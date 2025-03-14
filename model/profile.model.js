const mongoose = require("mongoose");
const schema = mongoose.Schema


const Userschema = new schema({
    userId: {
        type: String,
        required: true,
        unique : true
    }, 
    country: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    Fname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isFaSecret:{
        type: String
    },
    is_suspend: {
        type: Boolean,
    }
}, { timestamp : true})

module.exports = mongoose.model('profile', Userschema)