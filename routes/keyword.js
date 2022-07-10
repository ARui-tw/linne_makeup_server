import express from 'express';
import controller from '../controller';

const keywordRouter = express.Router();

keywordRouter.post('/createKeyword', controller.keyword.createKeyword);
keywordRouter.post('/modifyKeyword', controller.keyword.modifyKeyword);
keywordRouter.post('/getKeyword', controller.keyword.getKeyword);
keywordRouter.post('/getKeywords', controller.keyword.getKeywords);
keywordRouter.post('/removeKeyword', controller.keyword.removeKeyword);

export default keywordRouter;
