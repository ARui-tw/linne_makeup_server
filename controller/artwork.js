import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

const GetsRule = {
  filter: {
    type: 'object',
    optional: true,
  },
  limit: {
    type: 'number',
    optional: true,
  },
  skip: {
    type: 'number',
    optional: true,
  },
  sort: {
    type: 'object',
    optional: true,
  },
};

const modifyRule = {
  _id: idRule,
  certificate_url: {
    type: 'string',
    optional: true,
  },
  artwork_url: {
    type: 'string',
    optional: true,
  },
  profession_id: {
    type: 'string',
    optional: true,
  },
};

const artworkController = {

  async createArtwork(req, res) {
    try {
      const { profession_id: OwnerId } = req.headers;

      const params = {
        data: req.body,
        OwnerId,
      };

      const result = await service.artwork.createOneArt(params);

      res.json(result);
    } catch (error) {
      logger.error('[Artwork Controller] Failed to create one Art:', error);
      res.status(400).json({ message: `Failed to create one Art, ${error}` });
    }
  },

  async modifyArtwork(req, res) {
    try {
      validator.validate(req.body, modifyRule);

      const result = await service.artwork.modifyOneArt(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Artwork Controller] Failed to modify one:', error);
      res.status(400).json({ message: `Failed to modify one, ${error}` });
    }
  },

  async getArtwork(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const results = await service.artwork.getOneArt(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[Artwork Controller] Failed to get one Art:', error);
      res.status(400).json({ message: `Failed to get one Art, ${error}` });
    }
  },

  async getArtworks(req, res) {
    try {
      validator.validate(req.body, GetsRule);

      const results = await service.artwork.getAllArt(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[Artwork Controller] Failed to get all Art:', error);
      res.status(400).json({ message: `Failed to get all Art, ${error}` });
    }
  },

  async removeArtwork(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.artwork.deleteOneArt(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Artwork Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },

  async removeArtworks(req, res) {
    try {
      validator.validate(req.body, { profession_id: idRule });

      const result = await service.artwork.deleteAllArts(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Artwork Controller] Failed to remove all artworks:', error);
      res.status(400).json({ message: `Failed to remove all artworks, ${error}` });
    }
  },
};

export default artworkController;
