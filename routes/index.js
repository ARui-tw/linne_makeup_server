import express from 'express';
import cors from 'cors';
import professionRouter from './profession';
import artworkRouter from './artwork';

const router = express.Router();

router.use(cors());

router.use('/profession', professionRouter);
router.use('/artwork', artworkRouter);

export default router;
