const mongoose = require('mongoose');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const Booking = require('../models/booking.model');
const { mock } = require('../utils/mock/index');

const periodicServiceRequest = () =>
  new Promise((resolve, reject) => {
    if (!mock) {
      reject('Not found');
    }
    resolve(mock.periodicService);
  });
const FindServicePlan = async (periodicServiceId) => {
  // const periodicServiceId = 'C4575';
  const { results } = await periodicServiceRequest();
  const data = results.filter((r) => r.id === periodicServiceId);
  const servicePlan = data.filter((p) => p.id === periodicServiceId);
  return servicePlan;
};

const convertTime = (time) => {
  let hours = Number(time.match(/^(\d+)/)[1]);
  const minutes = Number(time.match(/:(\d+)/)[1]);
  const AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM === 'PM' && hours < 12) hours += 12;
  if (AMPM === 'AM' && hours === 12) hours -= 12;
  let sHours = hours.toString();
  let sMinutes = minutes.toString();
  if (hours < 10) sHours = `0${sHours}`;
  if (minutes < 10) sMinutes = `0${sMinutes}`;

  return `${sHours}:${sMinutes}`;
};

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const prevDate = new Date();
  prevDate.setDate(currentDate.getDate() - 30);
  const year = req.params.year * 1;
  console.log(
    'PREv',
    `${prevDate.getFullYear()}-${prevDate.getMonth() + 1}-${prevDate.getDate()}`
  );
  console.log(
    'Next',
    `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`
  );
  const userId = mongoose.Types.ObjectId(req.user.id);
  const plan = await Booking.aggregate([
    {
      $match: {
        // user: { $eq: userId },
        $and: [
          {
            createdAt: {
              $gte: new Date(
                `${prevDate.getFullYear()}-${
                  prevDate.getMonth() + 1
                }-${prevDate.getDate()}`
              ),
              // next month
              $lte: new Date(
                `${currentDate.getFullYear()}-${
                  currentDate.getMonth() + 1
                }-${currentDate.getDate()}`
              ),
            },
          },
          { user: { $eq: userId } },
          {
            'carDetails.registrationNo': { $eq: req.user.myCar.registrationNo },
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        numOfOrders: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0, //project is used get rid of the fields  each of the fields o 0 or 1 0 means no longer show up
      },
    },
  ]);
  if (plan.length === 0) return next();
  if (plan[0].numOfOrders > 0) {
    return next(
      new AppError(
        "Sorry you can't book service, You already booked service for this car in this month.",
        403
      )
    );
  }
  // res.status(200).json({
  //   status: 'SUccess',
  //   data: plan,
  // });
  next();
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  //This is only TEMPORARY,because it's UNSECURE: everyone can bookings without paying
  const { serviceId, price, pickupDateTime, address, carDetails } = req.body;

  if (!serviceId && !price)
    return next(
      new AppError('Something went wrong please try again check with')
    );
  const [periodicServicePlan] = await FindServicePlan(serviceId);

  if (!periodicServicePlan)
    return next(new AppError('The service plan  chosen is not available'));
  if (periodicServicePlan.price !== price)
    return next(
      new AppError('Something went wrong. You are trying to change price')
    );
  const { title } = periodicServicePlan;
  const timeArray = [
    '9-10AM',
    '10-11AM',
    '11-12PM',
    '12-1PM',
    '2-3PM',
    '3-4PM',
  ];

  if (!timeArray.includes(pickupDateTime.time)) {
    return next(
      new AppError('The pickup time you selected is not available or invalid')
    );
  }
  const pickupDateTimeFrom = new Date(pickupDateTime.date);
  const pickupDateTimeTo = new Date(pickupDateTime.date);
  const pickupTimefrom = convertTime(
    `${pickupDateTime.time.split('-')[0]}:00 ${
      pickupDateTime.time.match(/((?:A|P)\.?M\.?)/)[0]
    }`
  );
  const dateToFromat = 0;
  const pickupTimeto = convertTime(
    `${pickupDateTime.time.split('-')[1]}:00 ${
      pickupDateTime.time.match(/((?:A|P)\.?M\.?)/)[1]
    }`
  );
  pickupDateTimeFrom.setHours(parseInt(pickupTimefrom.split(':')[0]));
  pickupDateTimeFrom.setMinutes(parseInt(pickupTimefrom.split(':')[1]));

  pickupDateTimeTo.setHours(parseInt(pickupTimeto.split(':')[0]));
  pickupDateTimeTo.setMinutes(parseInt(pickupTimeto.split(':')[1]));

  // eslint-disable-next-line prettier/prettier
const generateRandomString = () => {
    const constantChar = 'C';
    const randomNumbers = Math.floor(Math.random() * 900000) + 100000; // Generate a random 6-digit number
    return constantChar + randomNumbers;
}

  const doc = await Booking.create({
    orderId: generateRandomString(),
    servicePlan: title,
    user: req.user.id,
    price,
    address,
    pickupDateTime: {
      from: pickupDateTimeFrom,
      to: pickupDateTimeTo,
    },
    carDetails: {
      ...carDetails,
    },
  });
  // res.redirect(req.originalUrl.split('?')[0]);
  // next();
  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.setUser = (req, res, next) => {
  if (req.user.id) {
    req.params.userId = req.user.id;
  }
  next();
};

const filterObj = (obj, ...allowedFields) => {
  // this will create an array tht we passed in
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.filterBody = (req, res, next) => {
  if (req.user.role === 'agent') {
    const filteredBody = filterObj(req.body, 'orderStatus');
    if (filteredBody.orderStatus === 'Deliveried') {
      filteredBody.deliveriedDate = new Date();
    }
    req.body = filteredBody;
  }
  next();
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
