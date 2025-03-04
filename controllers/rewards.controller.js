const RewardModel = require("../model/reward.model");

class Rewards{
    constructor(){
        this.resil = []
    }
    async climRewards(req, res){
        try{
            const userId = req.id
            const data = req.body
             await RewardModel.updateOne({userId, "reward.day": data?.day},{
                $set: {
                    "reward.$.isClaimed": true
                }
            })
            await RewardModel.updateOne({userId},{
                 $inc: { balance: data?.rewards } 
            })
            const user = await RewardModel.findOne({userId})
            return res.status(200).json(user)
        }
        catch(err){
            console.log(err)
            return res.status(404).json({error: "Something went wrong"})
        }
    }
    isToday(date) {
        const today = new Date();
        return date.getFullYear() === today.getFullYear() &&
               date.getMonth() === today.getMonth() &&
               date.getDate() === today.getDate();
    }
    getNext30Days(rewards){
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
          const time = new Date(today);
          time.setDate(today.getDate() + i);
          let re = rewards[i]
          dates.push({...re,time }); 
        }
        return dates;
    };
    async rewards(req, res){
        try{
            const userId = req.id
            const user = await RewardModel.findOne({userId})
            let Los = this.getNext30Days(user?.reward)
            Los.forEach((item)=>{
                if(this.isToday(item.time)){
                    if(!item.isClaimed){
                        item.canClaim = true
                    } 
                }
            })
            
            await RewardModel.updateOne({userId}, {
                reward: Los
            })
            return res.status(200).json({reward:Los, user})
        }
        catch(err){
            console.log(err)
            return res.status(404).json({error: "Something went wrong"})
        }
    }
    async useReferralCode(req, res){
        try{
            const {code} = req.body
            const exist = await RewardModel.findOne({referalCode:code})
            if(!exist){
                return res.status(404).json({error: "Invalid invite code"})
            }
            const invitee = exist?.userId
            
        }
        catch(err){
            console.log(err)
            return res.status(404).json({error: "Something went wrong"})
        }
    }
}

module.exports = Rewards