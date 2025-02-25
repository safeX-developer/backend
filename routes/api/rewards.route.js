const express = require('express')
const router = express.Router()
const requireAuth = require('../../middleware/requireAuth')
const Rewards = require('../../controllers/rewards.controller')
const controller = new Rewards()
 
router.get('/daily',requireAuth, controller.rewards.bind(controller))


module.exports = router