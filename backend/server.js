const express = require("express")
const authRoutes = require('./Routes/authRoutes')
const messageRoutes = require('./Routes/messageRoutes')
const userRoutes = require('./Routes/userRoutes')
const connectToMongo = require('./db/connect');
require('dotenv').config()
const cookieParser = require('cookie-parser');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/users',userRoutes);
app.use(errorHandlerMiddleware);

// app.get('/',(req,res)=>{
//     res.send("Main Route");
// })

app.listen(port, () => {
    connectToMongo(process.env.MONGO_DB_URI);
    console.log(`Server is listening on port ${port}...`)
})