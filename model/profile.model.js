const mongoose = require("mongoose");
const schema = mongoose.Schema

const Userschema = new schema({
    user_id: {
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
    balance: {
        type: Number,
        required: true,
    },
    profile_image: {
        type: String,
        required: true,
    },
    total_wagered: {
        type: Number,
        required: true,
    },
    invited_code: {
        type: String,
    },
    fa_auth: {
        type: Boolean,
    },
    details: {
        type: Object,
    },
    is_suspend: {
        type: Boolean,
    }
}, { timestamp : true})

module.exports = mongoose.model('profile', Userschema)