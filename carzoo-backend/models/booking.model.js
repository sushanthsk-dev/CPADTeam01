const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  agent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Admin',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  servicePlan: {
    type: String,
    required: [true, 'Plan is required'],
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price'],
  },
  pickupDateTime: {
    from: {
      type: Date,
      required: [true, 'Pickup date from is required'],
    },
    to: {
      type: Date,
      required: [true, 'Pickup date to is required'],
    },
  },
  deliveriedDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: false,
  },
  orderStatus: {
    type: String,
    enum: ['Ordered', 'Pickedup', 'Serviced', 'Deliveried'],
    default: 'Ordered',
  },
  carDetails: {
    registrationNo: {
      type: String,
      validator: function (regNo) {
        return /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/.test(regNo).test(v);
      },
      message: 'Please enter a valid registration number!',
    },
    carModel: {
      type: String,
      enum: [
        'Maruti Suzuki Baleno',
        'Maruti Suzuki Swift',
        'Maruti Suzuki Ertiga',
        'Maruti Suzuki Vitara Brezza',
        'Maruti Suzuki Dzire',
        'Maruti Suzuki Wagon R',
        'Maruti Suzuki Celerio',
        'Maruti Suzuki Ignis',
        'Maruti Suzuki Ciaz',
        'Maruti Suzuki Eeco',
        'Maruti Suzuki Alto',
      ],
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel'],
    },
    modelYear: {
      type: Number,
      validator: function (year) {
        return year > 1990;
      },
      message: 'Model year of the car must be greater then 1990',
    },
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo address phoneno',
  }).populate({
    path: 'agent',
    select: 'name phoneno workAssignedLocation photo',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
