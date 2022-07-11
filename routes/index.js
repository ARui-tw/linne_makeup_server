import express from 'express';
import cors from 'cors';
import absoluteScoreRouter from './absoluteScore';

const router = express.Router();

router.use(cors());

router.use('/absoluteScore', absoluteScoreRouter);

export default router;
