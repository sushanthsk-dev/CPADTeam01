const express = require('express');
const User = require('../models/user.model');
const authController = require('../controllers/auth.controller');
const documentController = require('../controllers/document.controller');

const documentRouter = express.Router();

documentRouter.use(authController.protect(User));

documentRouter
  .route('/emission')
  .get(documentController.getDocument)
  .patch(
    documentController.checkEmissionRequiredData,
    documentController.createDocument
  )
  .delete(documentController.deleteDocument);
documentRouter
  .route('/insurance')
  .get(documentController.getDocument)
  .patch(
    documentController.checkInsuranceRequiredData,
    documentController.createDocument
  )
  .delete(documentController.deleteDocument);

// documentRouter
//   .route('/document/:doc')
//   .delete(documentController.deleteDocument);

module.exports = documentRouter;
