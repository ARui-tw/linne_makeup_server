import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const absoluteScoreRouter = express.Router();

absoluteScoreRouter.post('/createAbsoluteScore', authentication(), controller.absoluteScore.createAbsoluteScore);
absoluteScoreRouter.post('/modifyAbsoluteScore', authentication('admin'), controller.absoluteScore.modifyAbsoluteScore);
absoluteScoreRouter.post('/getAbsoluteScore', authentication('admin'), controller.absoluteScore.getAbsoluteScore);
absoluteScoreRouter.post('/getAbsoluteScores', authentication('admin'), controller.absoluteScore.getAbsoluteScores);
absoluteScoreRouter.post('/removeAbsoluteScore', authentication('admin'), controller.absoluteScore.removeAbsoluteScore);

export default absoluteScoreRouter;
