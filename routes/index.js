import express from 'express';
import cors from 'cors';
import keywordRouter from './keyword';

const router = express.Router();

router.use(cors());

router.use('/keyword', keywordRouter);

export default router;
