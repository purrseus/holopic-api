const { connect } = require('mongoose');

const connectToDataBase = () => {
  return connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    error => {
      if (error) {
        console.log(
          `[Error] Could not connect to the DB. Exiting now...\n${error}`,
        );
        process.exit();
      }
      console.log('Connected to DB!');
    },
  );
};
module.exports = connectToDataBase;
