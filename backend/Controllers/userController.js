const { StatusCodes } = require('http-status-codes');
const User = require('../Models/user');

const getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUser = req.user._id;

        const filteredUsers = await User.find({ _id : { $ne: loggedInUser }}).select("-password");

        res.status(StatusCodes.OK).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}

module.exports = { getUsersForSidebar} 