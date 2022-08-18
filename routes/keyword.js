import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const keywordRouter = express.Router();

keywordRouter.post('/createKeyword', authentication(), controller.keyword.createKeyword);
keywordRouter.post('/modifyKeyword', authentication('admin'), controller.keyword.modifyKeyword);
keywordRouter.post('/getKeyword', authentication(), controller.keyword.getKeyword);
keywordRouter.post('/getKeywords', authentication(), controller.keyword.getKeywords);
keywordRouter.post('/removeKeyword', authentication('admin'), controller.keyword.removeKeyword);

export default keywordRouter;
