import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const keywordPhotoRouter = express.Router();

keywordPhotoRouter.post('/createKeywordPhoto', authentication('admin'), controller.keywordPhoto.createKeywordPhoto);
keywordPhotoRouter.post('/modifyKeywordPhoto', authentication('admin'), controller.keywordPhoto.modifyKeywordPhoto);
keywordPhotoRouter.post('/getKeywordPhoto', authentication('admin'), controller.keywordPhoto.getKeywordPhoto);
keywordPhotoRouter.post('/getKeywordPhotos', authentication('admin'), controller.keywordPhoto.getKeywordPhotos);
keywordPhotoRouter.post('/removeKeywordPhoto', authentication('admin'), controller.keywordPhoto.removeKeywordPhoto);

export default keywordPhotoRouter;
