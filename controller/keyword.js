import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

const nameRule = {
  type: 'string',
  empty: false,
};

const keywordController = {
  async createKeyword(req, res) {
    const createRule = {
      name: nameRule,
    };
    try {
      validator.validate(req.body, createRule);
      const result = await service.keyword.createOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Keyword Controller] Failed to create keyword:', error);
      res.status(400).json({ message: `Failed to create keyword, ${error}` });
    }
  },

  async modifyKeyword(req, res) {
    const modifyRule = {
      _id: idRule,
      name: nameRule,
    };
    try {
      validator.validate(req.body, modifyRule);
      const result = await service.keyword.modifyOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Keyword Controller] Failed to modify keyword:', error);
      res.status(400).json({ message: `Failed to modify keyword, ${error}` });
    }
  },

  async getKeyword(req, res) {
    const getRule = {
      _id: idRule,
    };
    try {
      validator.validate(req.body, getRule);
      const result = await service.keyword.getOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Keyword Controller] Failed to get keyword:', error);
      res.status(400).json({ message: `Failed to get keyword, ${error}` });
    }
  },

  async getKeywords(req, res) {
    const getsRule = {
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
    try {
      validator.validate(req.body, getsRule);
      const results = await service.keyword.getAll(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[Keyword Controller] Failed to get keywords:', error);
      res.status(400).json({ message: `Failed to get keywords, ${error}` });
    }
  },

  async removeKeyword(req, res) {
    const removeRule = {
      _id: idRule,
    };
    try {
      validator.validate(req.body, removeRule);
      const result = await service.keyword.deleteOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Keyword Controller] Failed to remove keyword:', error);
      res.status(400).json({ message: `Failed to remove keyword, ${error}` });
    }
  },
};

export default keywordController;
