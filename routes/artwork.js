import express from 'express';
import controller from '../controller';

const artworkRouter = express.Router();

artworkRouter.post('/createArtwork', controller.artwork.createArtwork);
artworkRouter.post('/modifyArtwork', controller.artwork.modifyArtwork);
artworkRouter.post('/getArkwork', controller.artwork.getArtwork);
artworkRouter.post('/getArkworks', controller.artwork.getArtworks);
artworkRouter.post('/removeArkwork', controller.artwork.removeArtwork);
artworkRouter.post('/removeArkworks', controller.artwork.removeArtworks);

export default artworkRouter;
