const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const value = err.message.match(/{([^}]*)}/g).toString();
  let msg;
  // console.log(Object.getOwnPropertyNames(value));
  if (value.includes('email') && value.includes('phoneno')) {
    msg = 'Email address and phoneno already exist with another user.';
  } else if (value.includes('email')) {
    msg = 'Email address already exist with another user.';
  } else if (value.includes('phoneno')) {
    msg = 'Phone no already exist with another user';
  } else if (value.includes('myCar.registrationNo')) {
    msg = 'Car with this registration no. is already exists.';
  } else if (value.includes('insuranceDocument.registrationNo')) {
    msg = 'Insurance document of this car registration no. is already exists.';
  } else if (value.includes('emissionDocument.registrationNo')) {
    msg = 'Emission document of this car registration no. is already exists.';
  } else if (value.includes('insuranceDocument.policyNo')) {
    msg = 'Emission document of this policy no. is already exists.';
  } else if (value.includes('emissionDocument.puucNo')) {
    msg = 'Emission document of this policy no. is already exists.';
  } else {
    msg = value;
  }
  return new AppError(msg, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  if (errors.join('. ').includes('length')) {
    return new AppError('Password should contain minimum 8 characters', 400);
  }
  const message = `Invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token please login again', 401);

const handleTokenExpireError = () =>
  new AppError('Your token has expired ! Please login again', 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, req, res) => {
  //Operational,trusted error: send message to client
  // B) API
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  //Programming error or other unknown error: dont leak error details

  console.error('ERROR ', err);
  // 2) Send genreric message
  return res.status(500).json({
    status: 'Error',
    message: 'Something went very wrong',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; //internal server error
  err.status = err.status || 'error';
  // console.log(err);
  //stack trace
  //err.stack each and every error gets this stack tace and its just stack  err.stack is basically shows where the error
  //happend
  // console.log(err.stack);

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    //const error = err;
    let error = err;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFields(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleTokenExpireError();
    sendErrorProd(error, req, res);
  }
};
