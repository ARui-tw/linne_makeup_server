import express from 'express';
import cors from 'cors';
import professionRouter from './profession';

const router = express.Router();

router.use(cors());

router.use('/profession', professionRouter);

export default router;
