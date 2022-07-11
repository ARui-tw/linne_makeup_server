import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

const createRule = {
  score: {
    type: 'number',
    empty: false,
  },
  photo_id: idRule,
  relative_score_id: idRule,
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
  score: {
    type: 'number',
    optional: true,
  },
  photo_id: {
    type: 'string',
    optional: true,
  },
  relative_score_id: {
    type: 'string',
    optional: true,
  },
};

const photoRelativeController = {
  async createPhotoRelative(req, res) {
    try {
      validator.validate(req.body, createRule);

      const result = await service.photoRelative.createOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[PhotoRelative Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async modifyPhotoRelative(req, res) {
    try {
      validator.validate(req.body, modifyRule);

      const result = await service.photoRelative.modifyOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[PhotoRelative Controller] Failed to modify one:', error);
      res.status(400).json({ message: `Failed to modify one, ${error}` });
    }
  },

  async getPhotoRelative(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.photoRelative.getOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[PhotoRelative Controller] Failed to get one:', error);
      res.status(400).json({ message: `Failed to get one, ${error}` });
    }
  },

  async getPhotoRelatives(req, res) {
    try {
      validator.validate(req.body, GetsRule);

      const results = await service.photoRelative.getAll(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[PhotoRelative Controller] Failed to get all:', error);
      res.status(400).json({ message: `Failed to get all, ${error}` });
    }
  },

  async removePhotoRelative(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const professionDeleteResult = await service.photoRelative.deleteOne(req.body);

      res.json(professionDeleteResult);
    } catch (error) {
      logger.error('[PhotoRelative Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },
};

export default photoRelativeController;
