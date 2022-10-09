import mongoose from 'mongoose';
import logger from './logger';

const connectMongo = async () => {
  const {
    MONGO_SCHEME,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOST,
  } = process.env;

  const uri = `${MONGO_SCHEME}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/?retryWrites=true&w=majority`;

  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connection established.');
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB connection disconnected.');
  });

  mongoose.connection.on('close', () => {
    logger.info('MongoDB connection closed.');
  });

  mongoose.connection.on('error', (error) => {
    logger.error(`MongoDB connection error, ${error}`);
  });

  const connectWithRetry = () => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true,
      })
      .then(() => logger.info('successfully connected to DB'))
      .catch((e) => {
        logger.error(e);
        setTimeout(connectWithRetry, 5000);
      });
  };

  connectWithRetry();
};

export default connectMongo;
