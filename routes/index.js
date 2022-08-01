import express from 'express';
import cors from 'cors';
import photoRelativeRouter from './photoRelative';
import absoluteScoreRouter from './absoluteScore';
import keywordRouter from './keyword';

const router = express.Router();

router.use(cors());

router.use('/photoRelativeScore', photoRelativeRouter);
router.use('/absoluteScore', absoluteScoreRouter);
router.use('/keyword', keywordRouter);

export default router;
