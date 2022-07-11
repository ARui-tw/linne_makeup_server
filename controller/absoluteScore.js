import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

const createRule = {
  photo_id: idRule,
  score: {
    type: 'number',
    empty: false,
  },
  user_id: idRule,
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
  photo_id: {
    type: 'string',
    optional: true,
  },
  score: {
    type: 'number',
    optional: true,
  },
  user_id: {
    type: 'string',
    optional: true,
  },
};

const absoluteScoreController = {
  async createAbsoluteScore(req, res) {
    try {
      validator.validate(req.body, createRule);

      const result = await service.absoluteScore.createOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[AbsoluteScore Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async modifyAbsoluteScore(req, res) {
    try {
      validator.validate(req.body, modifyRule);

      const result = await service.absoluteScore.modifyOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[AbsoluteScore Controller] Failed to modify one:', error);
      res.status(400).json({ message: `Failed to modify one, ${error}` });
    }
  },

  async getAbsoluteScore(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.absoluteScore.getOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[AbsoluteScore Controller] Failed to get one:', error);
      res.status(400).json({ message: `Failed to get one, ${error}` });
    }
  },

  async getAbsoluteScores(req, res) {
    try {
      validator.validate(req.body, GetsRule);

      const results = await service.absoluteScore.getAll(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[AbsoluteScore Controller] Failed to get all:', error);
      res.status(400).json({ message: `Failed to get all, ${error}` });
    }
  },

  async removeAbsoluteScore(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.absoluteScore.deleteOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[AbsoluteScore Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },
};

export default absoluteScoreController;
