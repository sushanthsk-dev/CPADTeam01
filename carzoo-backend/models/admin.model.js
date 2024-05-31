const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
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
    enum: ['admin', 'agent', 'mechanic'],
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
      unique: true,
      message: 'Please enter 10 digit phone number!',
    },
  },
  isNewUser: {
    type: Boolean,
    default: true,
  },
  pincode: {
    type: Number,
    required: [true, 'please enter pincode'],
    validate: {
      validator: function (v) {
        return /[1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\s[0-9]{3}/.test(v);
      },
      message: 'Invalid pincode',
    },
  },
  workAssignedLocation: {
    type: String,
    required: [true, 'work assigned location is required'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: [Number],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
  },
});
adminSchema.index({ email: 1, phoneno: 1 }, { unique: true });
adminSchema.index({ phoneno: 1 }, { unique: 1, sparse: true });
adminSchema.index({ location: '2dsphere' });

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// adminSchema.pre(/^findOne/, async function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

adminSchema.methods.correctPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword);

adminSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTtimestamp < changedTimestamp;
  }
};

adminSchema.methods.createPasswordResetExpires = function () {
  this.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000;
  return this.passwordResetExpires;
};

adminSchema.methods.createPasswordResetToken = function () {
  // const resetToken = crypto.randomBytes(32).toString('hex');
  // this.passwordResetToken = crypto
  //   .createHash('sha256')
  //   .update(resetToken)
  //   .digest('dec');
  const resetToken = Math.floor(100000 + Math.random() * 900000);
  this.passwordResetToken = resetToken;
  this.passwordResetExpires = Date.now() + 5 * 60 * 1000;
  return resetToken;
};

const User = new mongoose.model('Admin', adminSchema);

module.exports = User;
