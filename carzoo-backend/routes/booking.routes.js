const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authController = require('../controllers/auth.controller');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');

router
  .route('/')
  .get(
    authController.protect(Admin),
    authController.restrictTo('admin', 'agent'),
    bookingController.getAllBooking
  )
  .post(bookingController.createBooking);

router.get(
  '/plan',
  authController.protect(User),
  bookingController.getMonthlyPlan
);
// for user
router
  .route('/checkout-session')
  .post(
    authController.protect(User),
    authController.restrictTo('user'),
    bookingController.getMonthlyPlan,
    authController.checkRequiredData,
    bookingController.createBookingCheckout
  );
router.get(
  '/user',
  authController.protect(User),
  bookingController.setUser,
  bookingController.getAllBooking
);

router
  .route('/user/:id')
  .get(
    authController.protect(User),
    authController.restrictTo('user', 'admin'),
    bookingController.getBooking
  );

router.use(
  authController.protect(Admin),
  authController.restrictTo('admin', 'agent')
);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.filterBody, bookingController.updateBooking)
  .delete(bookingController.deleteBooking);
module.exports = router;
