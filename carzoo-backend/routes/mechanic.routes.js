const express = require('express');
const mechanicController = require('../controllers/mechanic.controller');
const authController = require('../controllers/auth.controller');
const User = require('../models/user.model');

const router = express.Router();

router.use(authController.protect(User));
router
  .route('/mechanic-within/:distance/center/:latlng/unit/:unit')
  .get(mechanicController.getMechanicsWithin);
// /mechinc-distance?distance=233&center=13.058042, 74.994978&unit=mi
// /mechanic-distance/233/center/-45,45/unit/mi

router
  .route('/distances/:latlng/unit/:unit')
  .get(mechanicController.getDistances);

module.exports = router;
