const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userAvatar:{
        type:String,
    },
    Message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
})

userSchema.pre('save',async function(next){
    try{
        if(!this.isModified('password')){
            return next()
        }
        let salt =await bcrypt.genSalt();
        let hashedPassword =await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        //console.log(this.password);
        return next();
    }catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(receivedPassword, next){
    try{
        let isMatch = await bcrypt.compare(receivedPassword, this.password);
        return isMatch;
    }catch(err){
        return next(err);
    }
}
const User = mongoose.model('User', userSchema);
module.exports = User;