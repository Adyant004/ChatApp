const { StatusCodes } = require("http-status-codes");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");
const { v2 } = require('cloudinary');

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender, profilePic } = req.body;
    if (password !== confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).send("Passwords dont match!!");
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).send("User already exists!!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let img = null;

    console.log(img)
    if(!profilePic) {
      img = `https://avatar.iran.liara.run/public/${
        gender === "male" ? "boy" : "girl"
      }?username=${username}`;
    } else {
      const uploadResponse = await v2.uploader.upload(profilePic);
      img = uploadResponse.secure_url;
    }


    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: img,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(StatusCodes.CREATED).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid User Details" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username,password } = req.body;
    const user = await User.findOne({ username });
    const comparePassword = await bcrypt.compare(password, user?.password || "");

    if(!user || !comparePassword){
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid username or password" })
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(StatusCodes.OK).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        profilePic: user.profilePic
    })
  } catch (error) {
    console.log("Error in login controller", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt","",{ maxAge: 0})
    res.status(StatusCodes.OK).json({ message: "Logged Out Successfully " })
  } catch (error) {
    console.log("Error in logout controller ",err.message)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" })
  }
};

module.exports = {
  signup,
  login,
  logout,
};
