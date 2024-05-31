const schedule = require('node-schedule');
const User = require('../models/user.model');
const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/appError');
const CatchAsync = require('../utils/CatchAsync');
const factory = require('./handlerFactory');
const Email = require('../utils/email');

const alertMailSchedule = (userId, user, date) => {
  console.log('Schedule', date, userId.split('-')[0]);
  // let d = schedule.scheduledJobs[userId];
  console.log(schedule.scheduledJobs);
  if (schedule.scheduledJobs[userId]) {
    if (schedule.scheduledJobs[userId].name === userId) {
      console.log('CANCELLED');
      const job = schedule.scheduledJobs[userId].cancel();
    }
  }
  // const d = new Date('Tue Sep 07 2021 18:41:50 GMT+0530 (India Standard Time)');
  const newJob = schedule.scheduleJob(userId, date, async () => {
    try {
      console.log('USER ID', userId);
      if (userId.split('-')[2] === 'insurance') {
        const data = await User.findById(userId.split('-')[0]);
        console.log(
          `Your insurance policy no : ${data.insuranceDocument.policyNo} expires on ${data.insuranceDocument.expiryDate} ${date}`
        );
        const doc = {
          type: 'insurance',
          policyNo: data.insuranceDocument.policyNo,
          expiryDate: data.insuranceDocument.expiryDate.toLocaleDateString(),
        };
        await new Email(user, doc).sendAlert();
      }
      if (userId.split('-')[2] === 'emission') {
        const data = await User.findById(userId.split('-')[0]);
        console.log(
          `Your insurance policy no : ${data.emissionDocument.puucNo} expires on ${data.emissionDocument.expiryDate} ${date}`
        );
        const doc = {
          type: 'emission',
          policyNo: data.emissionDocument.puucNo,
          expiryDate: data.emissionDocument.expiryDate.toLocaleDateString(),
        };
        await new Email(user, doc).sendAlert();
      }
    } catch (e) {
      console.log(e);
      console.log('Something went wrong');
    }
  });
  console.log('JOB', schedule.scheduledJobs[userId].name);
};

const deleteMailSchedule = (userId) => {
  console.log('DELETED', userId);
  const job = schedule.scheduledJobs[userId];
  if (job) {
    job.cancel();
  }
};

const filterObj = (obj, ...allowedFields) => {
  // this will create an array tht we passed in
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const regNoValidate = (registrationNo) =>
  /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(registrationNo);

const expireDateValidate = (expireDate) => {
  // const date = new Date(expireDate);
  // console.log(date.toDateString());
  // const currentDate = new Date();
  // console.log(expireDate > currentDate);

  return new Date(expireDate) > new Date();
  // if (expireDate > currentDate) {
  //   return false;
  // }
  // return true;
};

exports.checkEmissionRequiredData = (req, res, next) => {
  const doc = req.body.emissionDocument ? req.body : null;
  if (!doc) {
    return next(new AppError('Emission details are required', 400));
  }
  if (doc.emissionDocument) {
    let errorList = [];
    const { registrationNo, puucNo, customerName, expiryDate } =
      doc.emissionDocument;
    if (!registrationNo) {
      errorList.push('vehicle registration no  is required');
    }
    if (!puucNo) {
      errorList.push('PUUC No is required');
    }
    if (!customerName) {
      errorList.push('Customer Name is required');
    }
    if (!expiryDate) {
      errorList.push('Expiry Date is required');
    }
    if (errorList.length > 0) {
      return next(new AppError(errorList, 400));
    }

    const regNo = regNoValidate(registrationNo);
    if (!regNo) errorList.push('Invalid registration no format');

    const expired = expireDateValidate(new Date(expiryDate));

    if (!expired)
      errorList.push(
        'Expire date must be greater then 3 days from current date'
      );

    if (errorList.length > 0) {
      return next(new AppError(errorList, 400));
    }
  }

  if (!doc.emissionDocument) {
    return next(new AppError(' Emission document data is required', 400));
  }

  next();
};

exports.checkInsuranceRequiredData = (req, res, next) => {
  const doc = req.body.insuranceDocument ? req.body : null;
  if (!doc) {
    return next(new AppError('Insurance details required', 400));
  }
  if (doc.insuranceDocument) {
    let errorList = [];
    const { registrationNo, policyNo, insuredName, expiryDate } =
      doc.insuranceDocument;
    if (!registrationNo) {
      errorList.push('Vehicle registration no  is required');
    }
    if (!policyNo) {
      errorList.push('Policy no is required');
    }
    if (!insuredName) {
      errorList.push('Insurance name is required');
    }
    if (!expiryDate) {
      errorList.push('Expiry date is required');
    }
    if (errorList.length > 0) {
      return next(new AppError(errorList, 400));
    }

    const regNo = regNoValidate(registrationNo);
    if (!regNo) errorList.push('Invalid registration no format');

    const expired = expireDateValidate(expiryDate);
    if (!expired)
      errorList.push(
        'Expire date must be greater then 2 days from current date'
      );

    if (errorList.length > 0) {
      return next(new AppError(errorList, 400));
    }
  }
  if (!doc.insuranceDocument) {
    return next(new AppError('Insurance document data is required', 400));
  }
  next();
};

exports.getDocument = CatchAsync(async (req, res, next) => {
  // const feature = new APIFeatures(User.findById(req.user.id), req.query)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .pagination();

  // const doc = await feature.query;

  const doc = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc,
    },
  });
});

exports.createDocument = CatchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'insuranceDocument',
    'emissionDocument'
  );
  const docType = req.originalUrl.split('/')[4];
  const doc = await User.findByIdAndUpdate(req.user.id, filteredBody);
  const expiryDate = new Date(
    `${
      docType === 'insurance'
        ? filteredBody.insuranceDocument.expiryDate.split(' ')[0]
        : filteredBody.emissionDocument.expiryDate.split(' ')[0]
    } 10:00:00`
  );
  expiryDate.setDate(expiryDate.getDate() - 1);
  if (doc)
    alertMailSchedule(
      `${req.user.id}-${req.user.name.split(' ')[0]}-${docType}`,
      req.user,
      expiryDate
    );

  res.status(201).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

exports.deleteDocument = CatchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'insuranceDocument',
    'emissionDocument'
  );

  const docType = req.originalUrl.split('/')[4];

  const doc = await User.findByIdAndUpdate(req.user.id, {
    $unset: filteredBody,
  });
  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }
  deleteMailSchedule(`${doc._id}-${req.user.name.split(' ')[0]}-${docType}`);

  res.status(201).json({
    status: 'success',
    doc,
  });
  // filteredBody.insuranceDocument
  //   ? (doc.insuranceDocument = undefined)
  //   : filteredBody.emissionDocument
  //   ? (doc.emissionDocument = undefined)
  //   : null;
  // await doc.save();
});
