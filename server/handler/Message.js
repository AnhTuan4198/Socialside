const database = require('../models');

exports.createMessage = async function (req,res,next){
    try {
        let newMessage = await database.Message.create({
            text:req.body.text,
            User:req.params.id
        })
        let foundUser = await database.User.findById(req.params.id);
        foundUser.Message.push(newMessage.id);
        await foundUser.save();

        let foundMessage = await database.Message.findById(newMessage._id).populate("User",{    
            userName:true,
            userAvatar:true
        })

        return res.status(200).json(foundMessage);

    } catch (error) {
        return next(error)
    }
} 