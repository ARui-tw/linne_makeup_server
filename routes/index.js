import express from 'express';
import cors from 'cors';
import photoRelativeRouter from './photoRelative';

const router = express.Router();

router.use(cors());

router.use('/photoRelativeScore', photoRelativeRouter);

export default router;
