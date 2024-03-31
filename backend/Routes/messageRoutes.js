const express = require('express');
const router = express.Router();

const { sendMessages,getMessages,updateMessage, deleteMessage } = require('../Controllers/messageController')
const protectRoute = require('../middleware/protectRoute')

router.route('/:id').get(protectRoute,getMessages);
router.route('/send/:id').post(protectRoute,sendMessages);
router.route('/update/:id').patch(protectRoute,updateMessage);
router.route('/delete/:id').delete(protectRoute,deleteMessage)

module.exports = router;