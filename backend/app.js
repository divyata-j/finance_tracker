const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./db/db')
const { errorHandler } = require('./middlewares/errorMiddleware')
const { verifyToken } = require('./middlewares/verifyToken')

//Initialize the database connection
connectDB()

//Used to wrap the req.body to json object
app.use( express.json() )
app.use( express.urlencoded({ extended: false }) )
app.use(cors())

app.use('/api/user', require('./routes/userRoutes'))

app.use('/api/v1', verifyToken, require('./routes/transactionRoutes'))


//Overwrites the default Express Error Handler
app.use(errorHandler)

//Set the Port from .env file
const port = process.env.PORT || 5001
app.listen( port, () => console.log(`Server started at port ${port}`) )