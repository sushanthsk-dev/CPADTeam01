// const multer = require('multer');
// const sharp = require('sharp'); // image processing library for node js resizing images in a simple way
const AppError = require('../utils/appError');
const User = require('../models/user.model');

const catchAsync = require('../utils/CatchAsync');

const factory = require('./handlerFactory');
const Email = require('../utils/email');
const { generatePassword } = require('../utils/password-generator');
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },y
//   filename: (req, file, cb) => {
//     // user-5066079fdgg-3444559.45.jpg
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

/*

const multerStorage = multer.memoryStorage(); //this way the image will then be stored as a buffer
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only image', 400), false);
  }
};

// const upload = multer({ dest: 'public/img/users' });
// multer is a very popular middleware to handle  multi part form Data , which is a form in coding  thats used to upload files from a form
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

*/

const filterObj = (obj, ...allowedFields) => {
  // this will create an array tht we passed in
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateMe = (Model) =>
  catchAsync(async (req, res, next) => {
    //Can update name and email address
    // 1) Create the error if the user POST  password data

    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route not for password updates.Please use /updateMyPassword',
          400
        )
      );
    }
    // 4) FIltered out unwanted fields name that are not allowed to update
    const filteredBody = filterObj(
      req.body,
      'name',
      'email',
      'address',
      'location',
      'phoneno',
      'workAssignedLocation',
      'pincode',
      'isNewUser',
      'myCar'
    );
    if (req.file) filteredBody.photo = req.file.filename;
    // 3) IF not update user document
    const updatedUser = await Model.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  });

exports.updateAdminMe = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route not for password updates.Please use /updateMyPassword',
          400
        )
      );
    }
    // 4) FIltered out unwanted fields name that are not allowed to update
    let filteredBody;
    if (req.user.role === 'agent') {
      filteredBody = filterObj(
        req.body,
        'name',
        'email',
        'address',
        'phoneno',
        'workAssignedLocation',
        'pincode',
        'photo'
      );
    } else if (req.user.role === 'mechanic') {
      filteredBody = filterObj(req.body, 'location');
    } else {
      filteredBody = filterObj(
        req.body,
        'name',
        'email',
        'address',
        'location',
        'phoneno',
        'workAssignedLocation',
        'pincode',
        'photo'
      );
    }
    if (req.file) filteredBody.photo = req.file.filename;
    // 3) IF not update user document
    const updatedUser = await Model.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  });

exports.deleteMe = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndUpdate(req.user.id, { active: false });
    res.status(200).json({
      status: 'success',
      data: null,
    });
  });

exports.deleteAgentMechanic = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndUpdate(req.body.userId, { active: false });
    res.status(200).json({
      status: 'success',
      data: null,
    });
  });

exports.activateAgentMechanic = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndUpdate(req.body.userId, { active: true });
    res.status(200).json({
      status: 'success',
      data: null,
    });
  });

exports.createUser = (Model) =>
  catchAsync(async (req, res, next) => {
    const code = generatePassword();
    req.body.password = code;
    req.body.passwordConfirm = code;
    const user = await Model.create(req.body);
    user.createPasswordResetExpires();
    await user.save({ validateBeforeSave: false });
    await new Email(user, code).sendWelcome();
    res.status(201).json({
      status: 'success',
      data: user,
    });
  });

exports.getAllUsers = (Model) => factory.getAll(Model);
exports.getUser = (Model) => factory.getOne(Model);
//Do not update passwords with this
exports.updateUser = (Model) => factory.updateOne(Model);
exports.deleteUser = (Model) => factory.deleteOne(Model);
