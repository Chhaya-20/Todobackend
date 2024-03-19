const express = require('express');
const router = express.Router();

const {LoginUser,SignupUser} = require('../controllers/User')



//LOGIN USER
router.post('/login',LoginUser)


//SIGNUP USER
router.post('/signup',SignupUser)

module.exports = router;
