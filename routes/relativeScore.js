import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const relativeScoreRouter = express.Router();

relativeScoreRouter.post('/createRelativeScore', authentication(), controller.relativeScore.createRelativeScore);
relativeScoreRouter.post('/modifyRelativeScore', authentication('admin'), controller.relativeScore.modifyRelativeScore);
relativeScoreRouter.post('/getRelativeScore', authentication('admin'), controller.relativeScore.getRelativeScore);
relativeScoreRouter.post('/getRelativeScores', authentication('admin'), controller.relativeScore.getRelativeScores);
relativeScoreRouter.post('/removeRelativeScore', authentication('admin'), controller.relativeScore.removeRelativeScore);

export default relativeScoreRouter;
