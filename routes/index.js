import express from 'express';
import cors from 'cors';

import absoluteScoreRouter from './absoluteScore';
import keywordRouter from './keyword';
import keywordPhotoRouter from './keywordPhoto';

const router = express.Router();

router.use(cors());

router.use('/absoluteScore', absoluteScoreRouter);
router.use('/keyword', keywordRouter);
router.use('/keywordPhoto', keywordPhotoRouter);

export default router;
