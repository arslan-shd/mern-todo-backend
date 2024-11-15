const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  console.log(value);
  const message = `${value} is already in use.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  //const errors will get all the error messages
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const handleJWTError = () => {
  const message = "Invalid Token. Please Log in again.";
  return new AppError(message, 401);
};

const handleTokenExpiredError = () => {
  return new AppError("The token has expired. Please log in again.", 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client.
  console.log("I am an error from sendErrorProd function", err);

  if (err.isOperational) {
    // console.log(err.message, 'This is an error message from sendErrorProd');
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programming or other unknown error: don't leak error details.
  } else {
    //1) Log error
    console.error("Error 💥", err);

    //2) Send generic message.

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // err.status = err.status || 'error';

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.kind === "ObjectId" || error.kind === "required") {
      error = handleCastErrorDB(err);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(err);
    }

    if (
      error._message === "Validation failed" ||
      error._message === "User validation failed"
    ) {
      error = handleValidationErrorDB(err);
    }

    if (error.name === "JsonWebTokenError") {
      error = handleJWTError(err);
    }

    if (error.name === "TokenExpiredError") {
      error = handleTokenExpiredError(err);
    }

    sendErrorProd(error, res);
  }
};
