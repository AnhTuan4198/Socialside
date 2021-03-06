const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../handler/auth');

router.post('/signin',signIn);
router.post('/signup',signUp);

module.exports = router;