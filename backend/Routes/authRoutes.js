const express = require("express");
const router = express.Router();

const {
    signup,
    login,
    logout,
} = require('../Controllers/authController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/logout').post(logout);

module.exports = router;