const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../Models/user');

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;

        if(!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" })
        }
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
        if(!decoded){
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized: Invalid token" })
        }
    
        const user = await User.findById(decoded.userId).select("-password");
    
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found!" })
        }
    
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = protectRoute;