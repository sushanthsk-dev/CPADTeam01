const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');
const Email = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXIPRE_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};

const checkNewUserLogin = (Model) =>
  CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError('Please provide email and password', 400));

    const user = await Model.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError('Incorrect email or password', 401));

    if (user.passwordResetExpires) {
      if (user.passwordResetExpires > Date.now())
        return next(new AppError('Password is invalid or has expired', 400));
    }

    // 2) If toekn has not expired, and there is user, set the new password

    //3) Update changedPAssword Property for the user
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetExpires = undefined;
    await user.save();
    //4) Log the user in,send JWT
    //

    createSendToken(user, 201, res);
  });

exports.signup = (Model) =>
  CatchAsync(async (req, res) => {
    const newUser = await Model.create(req.body);
    newUser.password = undefined;
    createSendToken(newUser, 201, res);
  });

exports.login = (Model) =>
  CatchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError('Please provide email and password', 400));

    const user = await Model.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new AppError('Incorrect email or password', 401));

    if (user.passwordResetExpires) {
      const currentDate = new Date();
      if (currentDate > user.passwordResetExpires) {
        user.active = false;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(
          new AppError('Password has expired. Please contact the admin', 400)
        );
      }
    }
    user.password = undefined;
    if (user.isNewUser) {
      return res.status(200).json({
        status: 'success',
        message: 'Please update your new password',
        data: {
          user: user,
        },
      });
    }
    createSendToken(user, 200, res);
  });

exports.protect = (Model) =>
  CatchAsync(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
      return next(
        new AppError('You are not logged in! Please log in to get access', 401)
      );

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await Model.findById(decoded.id);
    if (!currentUser)
      return next(
        new AppError(
          'The user belonging to this token does no longer exist',
          401
        )
      );

    if (currentUser.changedPasswordAfter(decoded.iat))
      return next(
        new AppError('User recently changed password! Please login again.', 401)
      );

    req.user = currentUser;
    next();
  });

exports.isLoggedIn = (Model) => async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      // 3) Check if user still exists
      const currentUser = await Model.findById(decoded.id);
      res.status(200).json({
        status: 'success',
        data: currentUser,
      });
    } catch (err) {
      res.status(404).json({
        status: 'error',
        data: null,
      });
    }
  }
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };

exports.forgotPassword = (Model) =>
  CatchAsync(async (req, res, next) => {

    const user = await Model.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new AppError('There is no user with this email address', 404)
      );
    }
    //2)Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false }); //deactivate the validate BeforeSave
    //3) send it to user's email

    //protcol http or https

    // const message = `Forgot your password? Submit a PATCH request qith your new password
    // and passwordConfirm to: ${resetURL}. \n If you didn' t forget your password, Please ignore this email!`;
    try {
      //   console.log(user.email);

      // await sendEmail({
      //   email: user.email,
      //   subject: 'Your password reset token (valid for 10min)',
      //   message,
      // });
      // const resetURL = `${req.protocol}://${req.get(
      //   'host'
      // )}/api/v1/users/resetPassword/${resetToken}`;
      const resetCode = resetToken;
      await new Email(user, resetCode).sendPasswordReset();
      res.status(200).json({
        status: 'success',
        message: 'Code sent to email',
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      //this only modify the data dnt save it in databse
      //  console.log(err);
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError(
          'There was an error sending the email.Try again later!',
          500
        )
      );
    }
  });

exports.verifyResetToken = (Model) =>
  CatchAsync(async (req, res, next) => {
    const hashedToken = req.params.token;
    const user = await Model.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gte: Date.now() },
    });
    // 2) If toekn has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    res.status(200).json({
      status: 'success',
      token: hashedToken,
    });
  });

exports.resetPassword = (Model) =>
  CatchAsync(async (req, res, next) => {
    const hashedToken = req.params.token;
    const user = await Model.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gte: Date.now() },
    });
    // 2) If toekn has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }

    //3) Update changedPAssword Property for the user
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    //4) Log the user in,send JWT
    //

    createSendToken(user, 201, res);
  });

exports.updatePassword = (Model) =>
  CatchAsync(async (req, res, next) => {
    // 1) Get user from the collection
    const user = await Model.findById(req.user.id).select('+password');
    //2) CHeck if posted current password is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Your current password is wrong', 400));
    }
    //3) If so,Update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 201, res);
  });
exports.changePassword = (Model) =>
  CatchAsync(async (req, res, next) => {
    // 1) Get user from the collection
    const user = await Model.findById(req.params.id).select('+password');

    //2) CHeck if posted current password is correct
    if (!user) return next(new AppError('You cannot access this route', 400));
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Your current password is wrong', 400));
    }
    //3) If so,Update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    user.passwordResetExpires = undefined;
    user.isNewUser = false;
    await user.save();
    createSendToken(user, 201, res);
  });

exports.checkRequiredData = (req, res, next) => {
  const user = req.body.address || req.body.phoneno ? req.body : req.user;

  if (user.address) {
    let errorList = [];
    const { address, pincode, city, state } = user.address;
    if (!address) {
      errorList.push('Address line 1 is Required');
    }
    if (!pincode) {
      errorList.push('Pincode is Required');
    }
    if (!city) {
      errorList.push('City is Required');
    }
    if (!state) {
      errorList.push('State is Required');
    }
    if (errorList.length > 0) {
      return next(new AppError(errorList, 400));
    }
  }

  if (!user.phoneno && !user.address) {
    return next(new AppError('Phone no and address is required', 400));
  }

  if (!user.phoneno) {
    return next(new AppError('Phone no is required', 400));
  }

  if (!user.address) {
    return next(new AppError('Address is required', 400));
  }
  next();
};

exports.checkValidationData = (req, res, next) => {
  const user = req.body;
  if (!user && !user.address && !user.phoneno) return next();
  if (user.address) {
    let errorList = [];
    const { address, pincode, city, state } = user.address;
    if (!address) {
      errorList.push('Address line 1 is Required');
    }
    if (!pincode) {
      errorList.push('Pincode is Required');
    }
    if (!city) {
      errorList.push('City is Required');
    }
    if (!state) {
      errorList.push('State is Required');
    }
    if (errorList.length > 0) {
      return next(new AppError(errorList, 400));
    }
  }
  next();
};
