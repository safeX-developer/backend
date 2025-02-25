
class Rewards{
    constructor(){
        this.dailyRewards = [
            {day: 1, rewards: 100}, 
            {day: 2, rewards: 200},
            {day: 3, rewards: 300}, 
            {day: 4, rewards: 400}, 
            {day: 5, rewards: 500}, 
            {day: 6, rewards: 600}, 
            {day: 7, rewards: 700}, 
            {day: 8, rewards: 800}, 
            {day: 9, rewards: 900}, 
            {day: 10, rewards: 1000}, 
            {day: 11, rewards: 1100}, 
            {day: 12, rewards: 1200}, 
            {day: 12, rewards: 1300}, 
            {day: 14, rewards: 1400}, 
            {day: 15, rewards: 1500}, 
            {day: 16, rewards: 1600}, 
            {day: 17, rewards: 1700}, 
            {day: 18, rewards: 1800}, 
            {day: 19, rewards: 1900}, 
            {day: 20, rewards: 2000}, 
            {day: 21, rewards: 2100}, 
            {day: 22, rewards: 2200}, 
            {day: 23, rewards: 2300}, 
            {day: 24, rewards: 2400}, 
            {day: 25, rewards: 2500}, 
            {day: 26, rewards: 2600}, 
            {day: 27, rewards: 2700}, 
            {day: 28, rewards: 2800}, 
            {day: 29, rewards: 2900}, 
            {day: 30, rewards: 3000}, 
        ]
    }
    async rewards(req, res){
        try{
            const userId = req.id
            let reward = this.dailyRewards
            return res.status(200).json(reward)
        }
        catch(err){
            console.log(err)
            return res.status(404).json({error: "Something went wrong"})
        }
       
    }
}

module.exports = Rewards