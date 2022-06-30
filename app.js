import express from 'express';
import connectMongo from './libs/connect_mongo';
import logger from './libs/logger';
import './libs/config';
import router from './routes';

const app = express();

// Connect to MongoDB
connectMongo();

// Body Parser
app.use(express.json());
app.use(express.raw({ type: 'image/*', limit: '15mb' }));
app.use(express.raw({ type: 'application/pdf', limit: '15mb' }));
app.use('/public', express.static('public'));

// Router
app.use(router);

app.listen(process.env.PORT, () => {
  logger.info(`Server is running at port ${process.env.PORT}`);
});
