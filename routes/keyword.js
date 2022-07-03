import express from 'express';
import controller from '../controller';

const keywordRouter = express.Router();

keywordRouter.post('/create', controller.keyword.create);
keywordRouter.post('/modify', controller.keyword.modify);
keywordRouter.post('/get', controller.keyword.get);
keywordRouter.post('/gets', controller.keyword.gets);
keywordRouter.post('/remove', controller.keyword.remove);

export default keywordRouter;
