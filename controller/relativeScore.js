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
  user_id: idRule,
};

const relativeScoreController = {
  async createRelativeScore(req, res) {
    try {
      validator.validate(req.body, { user_id: idRule });

      const result = await service.relativeScore.createOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[RelativeScore Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async modifyRelativeScore(req, res) {
    try {
      validator.validate(req.body, modifyRule);

      const result = await service.relativeScore.modifyOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[RelativeScore Controller] Failed to modify one:', error);
      res.status(400).json({ message: `Failed to modify one, ${error}` });
    }
  },

  async getRelativeScore(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.relativeScore.getOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[RelativeScore Controller] Failed to get one:', error);
      res.status(400).json({ message: `Failed to get one, ${error}` });
    }
  },

  async getRelativeScores(req, res) {
    try {
      validator.validate(req.body, GetsRule);

      const results = await service.relativeScore.getAll(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[RelativeScore Controller] Failed to get all:', error);
      res.status(400).json({ message: `Failed to get all, ${error}` });
    }
  },

  async removeRelativeScore(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.relativeScore.deleteOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[RelativeScore Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },
};

export default relativeScoreController;
