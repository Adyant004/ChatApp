const express = require('express');
const router = express.Router();

const { sendMessages,getMessages } = require('../Controllers/messageController')
const protectRoute = require('../middleware/protectRoute')

router.route('/:id').get(protectRoute,getMessages);
router.route('/send/:id').post(protectRoute,sendMessages)

module.exports = router;