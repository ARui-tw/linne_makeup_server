import express from 'express';
import controller from '../controller';

const professionRouter = express.Router();

professionRouter.post('/createProfession', controller.profession.createProfession);
professionRouter.post('/modifyProfession', controller.profession.modifyProfession);
professionRouter.post('/getProfession', controller.profession.getProfession);
professionRouter.post('/getProfessions', controller.profession.getProfessions);
professionRouter.post('/removeProfession', controller.profession.removeProfession);

export default professionRouter;
