const express = require("express")
const { app,server } = require('./Socket/socket')
const authRoutes = require('./Routes/authRoutes')
const messageRoutes = require('./Routes/messageRoutes')
const userRoutes = require('./Routes/userRoutes')
const connectToMongo = require('./db/connect');
require('dotenv').config()
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/users',userRoutes);


server.listen(port, () => {
    connectToMongo(process.env.MONGO_DB_URI);
    console.log(`Server is listening on port ${port}...`)
})