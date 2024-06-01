const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter a email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please enter a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user'],
    default: 'user',
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
    required: [true, 'please enter password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please enter confirm password'],
    validate: {
      validator: function (el) {
        return this.password === this.passwordConfirm;
      },
      message: 'Password are not the same!',
    },
  },
  phoneno: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/g.test(v);
      },
      message: 'Please enter 10 digit phone number!',
    },
  },
  address: {
    address: String,
    pincode: String,
    city: String,
    state: String,
  },
  myCar: {
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
  insuranceDocument: {
    insuranceCompanyName: String,
    registrationNo: String,
    policyNo: String,
    insuredName: String,
    expiryDate: Date,
  },
  emissionDocument: {
    registrationNo: String,
    puucNo: String,
    customerName: String,
    expiryDate: Date,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.index({ email: 1, phoneno: 1 }, { unique: true });
userSchema.index({ phoneno: 1 }, { unique: 1, sparse: true });
userSchema.index({ 'myCar.registrationNo': 1 }, { unique: 1, sparse: true });
userSchema.index(
  { 'insuranceDocument.registrationNo': 1 },
  { unique: 1, sparse: true }
);
userSchema.index(
  { 'emissionDocument.registrationNo': 1 },
  { unique: 1, sparse: true }
);
userSchema.index(
  { 'insuranceDocument.policyNo': 1 },
  { unique: 1, sparse: true }
);
userSchema.index({ 'emissionDocument.puucNo': 1 }, { unique: 1, sparse: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^findOne/, async function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTtimestamp < changedTimestamp;
  }
};

userSchema.methods.createPasswordResetToken = function () {

  const resetToken = Math.floor(100000 + Math.random() * 900000);
  this.passwordResetToken = resetToken;
  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 5 * 60 * 1000;
  return resetToken;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
