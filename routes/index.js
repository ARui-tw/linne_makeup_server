import express from 'express';
import cors from 'cors';
import relativeScoreRouter from './relativeScore';

const router = express.Router();

router.use(cors());

router.use('/relativeScore', relativeScoreRouter);

export default router;
