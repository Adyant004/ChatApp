const express = require("express")
const { app, server } = require('./Socket/socket')
const authRoutes = require('./Routes/authRoutes')
const messageRoutes = require('./Routes/messageRoutes')
const userRoutes = require('./Routes/userRoutes')
const connectToMongo = require('./db/connect');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const { v2 } = require('cloudinary');
const path = require('path');

const port = process.env.PORT || 5000;

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
    connectToMongo(process.env.MONGO_DB_URI);
    console.log(`Server is listening on port ${port}...`)
});
