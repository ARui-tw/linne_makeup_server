import express from 'express';
import controller from '../controller';

const absoluteScoreRouter = express.Router();

absoluteScoreRouter.post('/createAbsoluteScore', controller.absoluteScore.createAbsoluteScore);
absoluteScoreRouter.post('/modifyAbsoluteScore', controller.absoluteScore.modifyAbsoluteScore);
absoluteScoreRouter.post('/getAbsoluteScore', controller.absoluteScore.getAbsoluteScore);
absoluteScoreRouter.post('/getAbsoluteScores', controller.absoluteScore.getAbsoluteScores);
absoluteScoreRouter.post('/removeAbsoluteScore', controller.absoluteScore.removeAbsoluteScore);

export default absoluteScoreRouter;
