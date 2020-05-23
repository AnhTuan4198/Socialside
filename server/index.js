require('dotenv').config();
const express =require('express'); 
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const errorHandler = require("./handler/errorHandler");

const authRoutes = require('./routes/auth');
const messRoutes = require("./routes/Message");

const {loginRequired,onCorrectUser} = require('./middleware/auth');
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/users/:id/messages',loginRequired,onCorrectUser, messRoutes);


app.use(function(req,res,next){
    let err = new Error("Not found!");
    err.status=404;
    next(err);
})


app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server start at PORT ${PORT}`)
})