require('dotenv').config();
const express =require('express'); 
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./handler/errorHandler");
const authRoutes = require('./routes/auth');
const PORT = 8080;
const bcrypt = require("bcrypt");


app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth',authRoutes);

app.use(function(req,res,next){
    let err = new Error("Not found!");
    err.status=404;
    next(err);
})


let hashed =  bcrypt.hashSync('new', 10);
// console.log(hashed);

app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server start at PORT ${PORT}`)
})