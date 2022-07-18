import express from 'express';
import cors from 'cors';
import photoRelativeRouter from './photoRelative';
import keywordRouter from './keyword';

const router = express.Router();

router.use(cors());

router.use('/photoRelativeScore', photoRelativeRouter);
router.use('/keyword', keywordRouter);

export default router;
