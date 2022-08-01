import express from 'express';
import cors from 'cors';
import relativeScoreRouter from './relativeScore';
import absoluteScoreRouter from './absoluteScore';
import keywordRouter from './keyword';

const router = express.Router();

router.use(cors());

router.use('/relativeScore', relativeScoreRouter);
router.use('/absoluteScore', absoluteScoreRouter);
router.use('/keyword', keywordRouter);

export default router;
