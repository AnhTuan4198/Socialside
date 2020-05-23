const mongoose = require('mongoose');
const User = require("./User");

const messageSchema= new mongoose.Schema({
    text:{
        type:String,
        required:true,
        maxlength:160
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

messageSchema.pre('remove',async function(next){

    try {
        let user = User.findById(this.User);
        user.Message.remove(this.id);
        await user.save();
        return next();
    } catch (error) {
        return next(error);
    }
})



const Message = mongoose.model('Message', messageSchema);

module.exports = Message;