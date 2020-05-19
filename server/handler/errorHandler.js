 function errorHandler(error, request, response, next) {
    return response.status(error.status || 500).json({
        Error: {
            Message:error.message || "Oops some thing went wrong at server side!!"
        }
    });
 }    
module.exports = errorHandler;