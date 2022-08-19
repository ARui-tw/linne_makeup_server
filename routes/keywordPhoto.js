import express from 'express';
import controller from '../controller';

const keywordPhotoRouter = express.Router();

keywordPhotoRouter.post('/createKeywordPhoto', controller.keywordPhoto.createKeywordPhoto);
keywordPhotoRouter.post('/modifyKeywordPhoto', controller.keywordPhoto.modifyKeywordPhoto);
keywordPhotoRouter.post('/getKeywordPhoto', controller.keywordPhoto.getKeywordPhoto);
keywordPhotoRouter.post('/getKeywordPhotos', controller.keywordPhoto.getKeywordPhotos);
keywordPhotoRouter.post('/removeKeywordPhoto', controller.keywordPhoto.removeKeywordPhoto);

export default keywordPhotoRouter;
