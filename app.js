const express = require('express')
const router = require('./routes/web')
const app = express()
const port =3000
const connectdb = require('./db/dbconnect')
const web = require('./routes/web')
const session = require('express-session')
const flash = require('connect-flash')
// img upload krne k lir cloudinary pr
const fileUpload = require("express-fileupload")
// cookie parser
const cookieParser = require('cookie-parser')



app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
}))

app.use(flash())

// cookie parser
app.use(cookieParser())

// connect db
connectdb()
//set view engine for html
app.set('view engine','ejs')
// set static files css
app.use(express.static('public'))

// insert image
app.use(fileUpload({useTempFiles:true}))

// parse application  hmesha route k upr hi y s code aaega
app.use(express.urlencoded({extended:true}))     //get data in the form of objects
// load route
app.use('/',web)






// server create
app.listen(port,()=>{
    console.log(`server start localhost:${port}`)
})