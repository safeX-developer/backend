const express = require('express')
const router = express.Router()
const requireAuth = require('../../middleware/requireAuth')
const ProfileController = require('../../controllers/profile.controller')
const controller = new ProfileController()
 
router.get('/user/:address', controller.handleProfile)
router.post('/register', controller.register)

module.exports = router