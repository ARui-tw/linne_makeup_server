import express from 'express';
import cors from 'cors';
import photoRelativeRouter from './photoRelative';
import absoluteScoreRouter from './absoluteScore';
import professionRouter from './profession';
import artworkRouter from './artwork';
import keywordRouter from './keyword';
import userRouter from './user';

const router = express.Router();

router.use(cors());

router.use('/photoRelativeScore', photoRelativeRouter);
router.use('/profession', professionRouter);
router.use('/artwork', artworkRouter);
router.use('/absoluteScore', absoluteScoreRouter);
router.use('/keyword', keywordRouter);
router.use('/user', userRouter);

export default router;
