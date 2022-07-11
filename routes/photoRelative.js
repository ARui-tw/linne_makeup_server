import express from 'express';
import controller from '../controller';

const photoRelativeRouter = express.Router();

photoRelativeRouter.post('/createPhotoRelative', controller.photoRelative.createPhotoRelative);
photoRelativeRouter.post('/modifyPhotoRelative', controller.photoRelative.modifyPhotoRelative);
photoRelativeRouter.post('/getPhotoRelative', controller.photoRelative.getPhotoRelative);
photoRelativeRouter.post('/getPhotoRelatives', controller.photoRelative.getPhotoRelatives);
photoRelativeRouter.post('/removePhotoRelative', controller.photoRelative.removePhotoRelative);

export default photoRelativeRouter;
