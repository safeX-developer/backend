const mongoose = require("mongoose");
const schema = mongoose.Schema

const Userschema = new schema({
    userId: {
        type: String,
        required: true,
        unique : true
    }, 
    balance: {
        type: Number,
        default: 0
    },
    reward: {
        type: Array,
        default: [
            {day: 1, rewards: 100, isClaimed: false, canClaim: false}, 
            {day: 2, rewards: 200,  isClaimed: false, canClaim: false},
            {day: 3, rewards: 300 ,  isClaimed: false, canClaim: false}, 
            {day: 4, rewards: 400 ,  isClaimed: false, canClaim: false}, 
            {day: 5, rewards: 500 ,  isClaimed: false, canClaim: false}, 
            {day: 6, rewards: 600 ,  isClaimed: false, canClaim: false}, 
            {day: 7, rewards: 700 ,  isClaimed: false, canClaim: false}, 
            {day: 8, rewards: 800 ,  isClaimed: false, canClaim: false}, 
            {day: 9, rewards: 900 ,  isClaimed: false, canClaim: false}, 
            {day: 10, rewards: 1000 ,  isClaimed: false, canClaim: false}, 
            {day: 11, rewards: 1100 ,  isClaimed: false, canClaim: false}, 
            {day: 12, rewards: 1200 ,  isClaimed: false, canClaim: false}, 
            {day: 13, rewards: 1300 ,  isClaimed: false, canClaim: false}, 
            {day: 14, rewards: 1400 ,  isClaimed: false, canClaim: false}, 
            {day: 15, rewards: 1500 ,  isClaimed: false, canClaim: false}, 
            {day: 16, rewards: 1600 ,  isClaimed: false, canClaim: false}, 
            {day: 17, rewards: 1700 ,  isClaimed: false, canClaim: false}, 
            {day: 18, rewards: 1800 ,  isClaimed: false, canClaim: false}, 
            {day: 19, rewards: 1900 ,  isClaimed: false, canClaim: false}, 
            {day: 20, rewards: 2000 ,  isClaimed: false, canClaim: false}, 
            {day: 21, rewards: 2100 ,  isClaimed: false, canClaim: false}, 
            {day: 22, rewards: 2200 ,  isClaimed: false, canClaim: false}, 
            {day: 23, rewards: 2300 ,  isClaimed: false, canClaim: false}, 
            {day: 24, rewards: 2400 ,  isClaimed: false, canClaim: false}, 
            {day: 25, rewards: 2500 ,  isClaimed: false, canClaim: false}, 
            {day: 26, rewards: 2600 ,  isClaimed: false, canClaim: false}, 
            {day: 27, rewards: 2700 ,  isClaimed: false, canClaim: false}, 
            {day: 28, rewards: 2800 ,  isClaimed: false, canClaim: false}, 
            {day: 29, rewards: 2900 ,  isClaimed: false, canClaim: false}, 
            {day: 30, rewards: 3000 ,  isClaimed: false, canClaim: false}, 
        ]
    },
    lastClaimedDate: {
        type: Date,
        default: Date()
    }
}, { timestamp : true})

module.exports = mongoose.model('reward', Userschema)