const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const colors = require("colors")
const dotenv = require("dotenv")
const { Server } = require("http")
const { connect } = require("http2")
const connectDb = require("./config/connectDb")

//config dot env file 
dotenv.config();


//database call
connectDb();

//rest object
const app = express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
//user routes
app.use('/api/v1/users', require('./routes/userRoute'))
///transaction
app.use('/api/v1/transactions', require('./routes/transactionRoutes'))

//port
const PORT = 8080 || process.env.PORT

//listen Server
app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});