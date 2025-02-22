const jwt = require("jsonwebtoken");
const User = require("../model/profile.model")

const requireAuth = async (req, res, next) => {
  const SECRET = `InenwiNIWb39Nneol?s.mee39ns233hoosne(3n)`;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({error:"Authorization token required"});
  } else {
    const token = authorization.split(" ")[1];
    try {
      const {_id} = jwt.verify(token, SECRET);
      const user_id = await User.findOne({userId:_id}).select("userId")
      req.id = user_id?.userId
      next()
    } catch (error) {
      res.status(404).json({error:"Request not authorized"});
    }
  }
};

module.exports = requireAuth;