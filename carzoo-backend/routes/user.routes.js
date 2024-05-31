const express = require('express');
const User = require('../models/user.model');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/isloggedin', authController.isLoggedIn(User));

userRouter.post(
  '/signup',
  authController.checkValidationData,
  authController.signup(User)
);
userRouter.post('/login', authController.login(User));

userRouter.post('/forgotPassword', authController.forgotPassword(User));
userRouter.get(
  '/verifyResetToken/:token',
  authController.verifyResetToken(User)
);
userRouter.patch('/resetPassword/:token', authController.resetPassword(User)); //which will recive token and resets password
// After this middle ware all protect middleware runs
//Protect all routes after this middleware
userRouter.use(authController.protect(User));
userRouter.patch('/updateMyPassword', authController.updatePassword(User));
userRouter.get(
  '/me',
  authController.protect(User),
  userController.getMe,
  userController.getUser(User)
);
userRouter.delete(
  '/deleteMe',
  authController.protect(User),
  userController.deleteMe(User)
);

userRouter.patch(
  '/updateMe',
  authController.checkValidationData,
  userController.updateMe(User)
);

//PROTECTECT to User
userRouter.use(authController.restrictTo('admin'));
userRouter
  .route('/')
  .get(userController.getAllUsers(User))
  .post(userController.createUser(User));
userRouter
  .route('/:id')
  .get(userController.getUser(User))
  .patch(userController.updateUser(User))
  .delete(userController.deleteUser(User));

module.exports = userRouter;
