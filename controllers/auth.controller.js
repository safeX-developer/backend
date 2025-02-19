const jwt = require('jsonwebtoken');
const validator = require("validator")
const Auth = require("../model/profile.model")

class auth{
    constructor(){
        this.users = []
        this.serverError = "Server Error"
    }

    async signup(req, res){
        try{
            const { auth } = req.body
            if(auth?.userId){
              return  res.status(404).json({error:"Address does not exist"})
            }
            const Emailexist = await Auth.findOne({ email: auth?.email })
            if (Emailexist){
              return  res.status(401).json({error:"Email already exist"})
            }
            if (!Emailexist){
                console.log(data)
            }
        }
        catch(err){
            return  res.status(401).json({error: "Server Error"})
        }
    }
}

module.exports = auth