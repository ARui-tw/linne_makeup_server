import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const photoRelativeRouter = express.Router();

photoRelativeRouter.post('/createPhotoRelative', authentication(), controller.photoRelative.createPhotoRelative);
photoRelativeRouter.post('/modifyPhotoRelative', authentication('admin'), controller.photoRelative.modifyPhotoRelative);
photoRelativeRouter.post('/getPhotoRelative', authentication('admin'), controller.photoRelative.getPhotoRelative);
photoRelativeRouter.post('/getPhotoRelatives', authentication('admin'), controller.photoRelative.getPhotoRelatives);
photoRelativeRouter.post('/removePhotoRelative', authentication('admin'), controller.photoRelative.removePhotoRelative);

export default photoRelativeRouter;
