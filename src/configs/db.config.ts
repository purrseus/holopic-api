import mongoose from 'mongoose';

type ConnectToDataBaseType = () => void;

const connectToDataBase: ConnectToDataBaseType = () => {
  return mongoose.connect(
    process.env.MONGO_URI as string,
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
export default connectToDataBase;
