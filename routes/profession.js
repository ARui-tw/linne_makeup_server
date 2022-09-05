import express from 'express';
import controller from '../controller';
import authentication from '../middleware/authentication';

const professionRouter = express.Router();

professionRouter.post('/createProfession', controller.profession.createProfession);
professionRouter.post('/modifyProfession', authentication('admin'), controller.profession.modifyProfession);
professionRouter.post('/getProfession', authentication('admin'), controller.profession.getProfession);
professionRouter.post('/getProfessions', authentication('admin'), controller.profession.getProfessions);
professionRouter.post('/removeProfession', authentication('admin'), controller.profession.removeProfession);

export default professionRouter;
