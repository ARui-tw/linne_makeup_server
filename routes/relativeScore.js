import express from 'express';
import controller from '../controller';

const relativeScoreRouter = express.Router();

relativeScoreRouter.post('/createRelativeScore', controller.relativeScore.createRelativeScore);
relativeScoreRouter.post('/modifyRelativeScore', controller.relativeScore.modifyRelativeScore);
relativeScoreRouter.post('/getRelativeScore', controller.relativeScore.getRelativeScore);
relativeScoreRouter.post('/getRelativeScores', controller.relativeScore.getRelativeScores);
relativeScoreRouter.post('/removeRelativeScore', controller.relativeScore.removeRelativeScore);

export default relativeScoreRouter;
