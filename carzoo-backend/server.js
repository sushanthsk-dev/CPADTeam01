const app = require('./app');
const dotenv = require('dotenv');
const moongose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! SHUTTING DOWN');
  console.log(err, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

moongose
  .connect(DB, {   
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DATABASE connected successfully');
  })
  .catch((e) => console.log(e));
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', (err) => {
  console.log('SIGTERM Received, SHUTTING DOWN gracefully');
  server.close(() => {
    console.log('Process Terminated....');
  });
});
