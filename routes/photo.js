import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const photoRouter = express.Router();

photoRouter.post('/createPhoto', authentication(), controller.photo.createPhoto);
photoRouter.post('/modifyPhoto', authentication('admin'), controller.photo.modifyPhoto);
photoRouter.post('/getPhoto', authentication(), controller.photo.getPhoto);
photoRouter.post('/getRandomPhoto', authentication(), controller.photo.getRandomPhoto);
photoRouter.post('/getPhotos', authentication(), controller.photo.getPhotos);
photoRouter.post('/removePhoto', authentication('admin'), controller.photo.removePhoto);

export default photoRouter;
