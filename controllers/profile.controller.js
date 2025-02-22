const Profile = require("../model/profile.model")

class ProfileController{
  constructor(){
    this.user = []
  }
  async handleProfile(req, res){
    try{
        const userId = req.params
        if(!userId){
          return res.status(403).json({error: "Invalid user ID"})
        }
        else{
          const user = await Profile.findOne({userId: userId.address})
          if(!user){
              return res.status(403).json({error: "User not found"})
          }
          return res.status(200).json({user})
        }
    }
    catch(err){
      console.log(err)
      return res.status(403).json({error: "Server Error"})
    }
  }
  async register(req, res){
    try{
      const { register } = req.body
      console.log(register)
    }
    catch(err){
      console.log(err)
      return res.status(403).json({error: "Server Error"})
    }
  } 
}



  
module.exports = ProfileController