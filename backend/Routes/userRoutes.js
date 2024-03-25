const express = require('express');
const router = express.Router();
const { getUsersForSidebar } = require('../Controllers/userController');
const protectRoute = require('../middleware/protectRoute');

router.route('/').get(protectRoute,getUsersForSidebar);

module.exports = router;