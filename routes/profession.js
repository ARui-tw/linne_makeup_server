import express from 'express';
import controller from '../controller';

const professionRouter = express.Router();

professionRouter.post('/createProfession', controller.profession.createProfession);
professionRouter.post('/createArtwork', controller.profession.CreateArtwork);
professionRouter.post('/modifyProfession', controller.profession.modifyProfession);
professionRouter.post('/getProfession', controller.profession.getProfession);
professionRouter.post('/getProfessions', controller.profession.getProfessions);
professionRouter.post('/getArkworks', controller.profession.GetArtworks);
professionRouter.post('/removeProfession', controller.profession.removeProfession);
professionRouter.post('/removeArkworks', controller.profession.RemoveArtworks);

export default professionRouter;
