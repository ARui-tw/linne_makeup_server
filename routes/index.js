import express from 'express';
import cors from 'cors';
import professionRouter from './profession';
import artworkRouter from './artwork';
import keywordRouter from './keyword';

const router = express.Router();

router.use(cors());

router.use('/profession', professionRouter);
router.use('/artwork', artworkRouter);
router.use('/keyword', keywordRouter);

export default router;
