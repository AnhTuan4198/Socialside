require("dotenv");

const jwt = require ('jsonwebtoken');

exports.loginRequired =  function(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,process.env.SECRET_KEY,function(error,decoded){
            if(decoded){
                return next();
            }
            return next({
                status:401,
                message:"Please login first"
            });
        })

    } catch (error) {
        return next(error);
    }
}


exports.onCorrectUser =function(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function (error, decoded) {
          if (decoded && decoded.id === req.params.id) {
            return next();
          }
          return next({
            status: 401,
            message: "Unauthorized!!!!",
          });
        });
    } catch (error) {
        
    }
}