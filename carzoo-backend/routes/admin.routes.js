const express = require('express');
const Admin = require('../models/admin.model');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const adminRouter = express.Router();

adminRouter.get('/isloggedin', authController.isLoggedIn(Admin));

adminRouter.post('/signup', authController.signup(Admin));
adminRouter.post('/login', authController.login(Admin));

adminRouter.post('/forgotPassword', authController.forgotPassword(Admin));

adminRouter.get(
  '/verifyResetToken/:token',
  authController.verifyResetToken(Admin)
);

adminRouter.patch('/resetPassword/:token', authController.resetPassword(Admin)); //which will recive token and resets password
// After this middle ware all protect middleware runs
//Protect all routes after this middleware

adminRouter.patch(
  '/changeMyPassword/:id',
  authController.changePassword(Admin)
);

adminRouter.use(authController.protect(Admin));
adminRouter.patch('/updateMyPassword', authController.updatePassword(Admin));
adminRouter.get(
  '/me',
  authController.protect(Admin),
  userController.getMe,
  userController.getUser(Admin)
);
adminRouter.delete(
  '/deleteAgentMechanic',
  authController.protect(Admin),
  authController.restrictTo('admin'),
  userController.deleteAgentMechanic(Admin)
);

// Mechanic current location
adminRouter.patch(
  '/current-location',
  authController.restrictTo('admin', 'mechanic'),
  userController.updateAdminMe(Admin)
);

adminRouter.patch(
  '/activateAgentMechanic',
  authController.protect(Admin),
  authController.restrictTo('admin'),
  userController.activateAgentMechanic(Admin)
);

adminRouter.patch('/updateMe', userController.updateMe(Admin));

//PROTECTECT to ADMIN
adminRouter.use(authController.restrictTo('admin'));
adminRouter
  .route('/')
  .get(userController.getAllUsers(Admin))
  .post(userController.createUser(Admin));
adminRouter
  .route('/:id')
  .get(userController.getUser(Admin))
  .patch(userController.updateUser(Admin))
  .delete(userController.deleteUser(Admin));

module.exports = adminRouter;
