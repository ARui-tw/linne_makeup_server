import express from 'express';
import controller from '../controller';

const keywordRouter = express.Router();

keywordRouter.post('/create', controller.keyword.createKeyword);
keywordRouter.post('/modify', controller.keyword.modifyKeyword);
keywordRouter.post('/get', controller.keyword.getKeyword);
keywordRouter.post('/gets', controller.keyword.getKeywords);
keywordRouter.post('/remove', controller.keyword.removeKeyword);

export default keywordRouter;
