import express from 'express';
import controller from '../controller';

const artworkRouter = express.Router();

artworkRouter.post('/createArtwork', controller.artwork.createArtwork);
artworkRouter.post('/modifyArtwork', controller.artwork.modifyArtwork);
artworkRouter.post('/getArtwork', controller.artwork.getArtwork);
artworkRouter.post('/getArtworks', controller.artwork.getArtworks);
artworkRouter.post('/removeArtwork', controller.artwork.removeArtwork);
artworkRouter.post('/removeArtworks', controller.artwork.removeArtworks);

export default artworkRouter;
