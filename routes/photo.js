import express from 'express';
import controller from '../controller';

const photoRouter = express.Router();

photoRouter.post('/createPhoto', controller.photo.createPhoto);
photoRouter.post('/modifyPhoto', controller.photo.modifyPhoto);
photoRouter.post('/getPhoto', controller.photo.getPhoto);
photoRouter.post('/getPhotos', controller.photo.getPhotos);
photoRouter.post('/removePhoto', controller.photo.removePhoto);

export default photoRouter;
