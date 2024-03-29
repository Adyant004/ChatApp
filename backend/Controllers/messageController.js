const { StatusCodes } = require('http-status-codes');
const Conversation = require('../Models/conversations');
const Message = require('../Models/messages');
const { io, getReceiverSocketId } = require('../Socket/socket')
const { v2 } = require('cloudinary')

const sendMessages = async(req,res) => {
    try {
        const { message } = req.body;
        let { img } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;
    
        let conversations = await Conversation.findOne({
            participants: { $all: [senderId,receiverId] }, 
        });
    
        if(!conversations) {
            conversations = await Conversation.create({
                participants: [senderId,receiverId],   
            });
        }

        if(img) {
            const uploadResponse = await v2.uploader.upload(img);
            img = uploadResponse.secure_url;
        }
    
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            img,
        });
    
        if(newMessage){
            conversations.messages.push(newMessage._id)
        }
    
        await Promise.all([conversations.save(),newMessage.save()])

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(StatusCodes.CREATED).json(newMessage )
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}

const getMessages = async(req,res) => {
    try {
        const { id:userToChatId } = req.params;
        const senderId = req.user._id;

        let conversations = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId ]} 
        }).populate("messages");

        if(!conversations) return res.status(StatusCodes.OK).json([]);

        const messages = conversations.messages;
        console.log("backend ",messages)

        res.status(StatusCodes.OK).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }


}

module.exports = { sendMessages,getMessages }