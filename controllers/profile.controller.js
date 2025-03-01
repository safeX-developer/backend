const Profile = require("../model/profile.model")
const countries = require('i18n-iso-countries');
const { getCode } = require('country-list');
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const RewardModel = require("../model/reward.model");
const jwt = require("jsonwebtoken");

function isValidCountry(input) {
  return countries.isValid(input.toUpperCase()) || getCode(input) !== undefined;
}


class ProfileController{
  constructor(){
    this.user = []
  }
  createToken(_id){
    return jwt.sign({ _id }, `InenwiNIWb39Nneol?s.mee39nshoosne(3n)`, { expiresIn: '1d' })
  }
  async handleProfile(req, res){
    try{
        const userId = req.params
        if(!userId?.address){
          return res.status(403).json({error: "Invalid user ID"})
        }
        else{
          const user = await Profile.findOne({userId: userId?.address})
          if(!user){
              return res.status(200).json({error: "User not found"})
          }
          const token = this.createToken(userId?.address)
          return res.status(200).json({token,user})
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
      const exist = await Profile.findOne({userId: register?.userId})
      if(exist){
        return res.status(500).json({error: "Already regsitered with this wallet address"})
      }
      if(!register?.Fname){
        return res.status(500).json({error: "Invalid Full name"})
      }
      if(!register?.username){
        return res.status(500).json({error: "Invalid Username"})
      }
      if(!isValidCountry(register.country)){
        return res.status(500).json({error: "Country does not exist"})
      }
      if(!register?.address){
        return res.status(500).json({error: "Invalid Address"})
      }
      
      const user = await Profile.create(register)
      await RewardModel.create({userId: register?.userId})
      const token = this.createToken(register?.userId)
      return res.status(200).json({token,user})
    }
    catch(err){
      console.log(err)
      return res.status(403).json({error: "Server Error"})
    }
  } 
}



  
module.exports = ProfileController