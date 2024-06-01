const express = require('express');
const dotenv = require('dotenv');
const schedule = require('node-schedule');
const userRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');
const bookingRouter = require('./routes/booking.routes');
const mechanicRouter = require('./routes/mechanic.routes');
const documentRouter = require('./routes/document.routes');
const AppError = require('./utils/appError');

const golbalErrorHandler = require('./controllers/error.controller');
dotenv.config({ path: './.env' });

schedule.scheduleJob('*/25 * * * *', function () {
  console.log('This runs every 20 minutes');
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: 'carzoo api',
  });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/booking', bookingRouter);
app.use('/api/v1/mechanic', mechanicRouter);
app.use('/api/v1/document', documentRouter);


app.use(golbalErrorHandler);

module.exports = app;
