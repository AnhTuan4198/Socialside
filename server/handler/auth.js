const database = require('../models');
const jwt = require('jsonwebtoken');
module.exports.signIn = async function (req,res,next){
    try{
        let user =await database.User.findOne({
            email:req.body.email
        });
        console.log(user)
        let {id ,userName,userAvatar,password} =user ;
        let isMatch =  await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign(
              {
                id,
                userName,
                userAvatar,
              },
              process.env.SECRET_KEY
            );
            return res.status(200).json({
              id,
              userName,
              userAvatar,
              token
            });
        }
        else{
            return next({
                status:400,
                message:"Invalid Email/Password "
            })
        }
    }catch(err){
        return next(
            {
                status:400,
                message:"Invalid Email/Password "
            }
        )
    }
}

module.exports.signUp = async function (req, res, next) {
  try {
    let user = await database.User.create(req.body);
    console.log(user);
    let {id,userName,userAvatar,password} = user;
    let token = await  jwt.sign({
        id,
        userName,
        userAvatar
    },process.env.SECRET_KEY);
    return res.status(200).json({
        id,
        userName,
        userAvatar,
        token,
        password
    })
  } catch (err) {
    if(err.code == 11000){
        err.message = "Sorry email/name is already taken!" 
    }
    return next({
        status:400,
        message: err.message
    })
  }
};