const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');
const userCtrl = require('../controllers/users');

router.route('/register')
    .get(userCtrl.renderRegister)
    .post(catchAsync(userCtrl.register));

router.route('/login')
    .get(userCtrl.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userCtrl.login)

router.get('/logout', userCtrl.logout);

module.exports = router;