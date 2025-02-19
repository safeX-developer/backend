const Profile = require("../model/profile.model")
const UserAuth = require("../model/auth.model")
const bcrypt = require("bcryptjs")
const validator = require("validator")

class ProfileController{
  constructor(){
    this.user = []
  }
  async handleProfile(req, res){
    try{
        const user_id = req.id
        if(!user_id){
          return res.status(403).json({error: "Invalid user ID"})
        }
        else{
          const user = await Profile.findOne({user_id})
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
}



  
module.exports = ProfileController