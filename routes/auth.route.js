const express = require('express')
const router = express.Router()

const controller = require('../controllers/auth.controller');
const _auth = new controller()

router.post('/register', _auth.signup);

module.exports = router