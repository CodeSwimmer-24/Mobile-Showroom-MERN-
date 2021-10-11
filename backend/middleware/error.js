const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

// Wrong MongoDb Id error
if(err.name === "CastError"){
    const message = `Resource not Found . Invalid: ${err.path}`;
    err  = new ErrorHandler(message,400);
}

    res.status(err.statusCode).json({
        sucess:false,
        error:err,
        message:err.message
    })
}