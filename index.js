const express = require('express')
const app = express()
const path = require('path')
const Cors = require('cors')
const corsOption = require('./config/corsOption')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const PORT = 3500
const connectDB = require('./config/dbConn')
const { default: mongoose } = require('mongoose')


connectDB()

app.use(Cors(corsOption))

app.use('/' , express.static(path.join(__dirname , 'public')))
app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(cookieParser())

app.use('/' , require('./routes/dir'))

app.use('/register' , require('./routes/api/register'))
app.use('/auth' , require('./routes/api/auth'))
app.use('/refresh' , require('./routes/api/refresh'))
app.use('/logout' , require('./routes/api/logout'))

app.use(verifyJWT)
app.use('/employees', require('./routes/api/employee'))


mongoose.connection.once("open", ()=>{
    console.log("connected to mongodb");
    app.listen(PORT , ()=>{
        console.log(`server running on port : ${PORT}`);
    })
})