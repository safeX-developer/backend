const express = require('express')
const router = express.Router()
const requireAuth = require('../../middleware/requireAuth')
const ProfileController = require('../../controllers/profile.controller')
const controller = new ProfileController()
 
router.get('/user/:address', controller.handleProfile.bind(controller))
router.post('/register/:code', controller.register.bind(controller))
router.post('/change-details', requireAuth,  controller.changeDetails.bind(controller))

module.exports = router