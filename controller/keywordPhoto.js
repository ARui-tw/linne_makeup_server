import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

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

const modifyRule = {
  _id: idRule,
  url: {
    type: 'string',
    optional: true,
  },
  provided_user: {
    type: 'string',
    optional: true,
  },
  keyword_id: {
    type: 'string',
    optional: true,
  },
};

const keywordPhotoController = {
  async createKeywordPhoto(req, res) {
    try {
      const { keyword_id: KeywordId, filename: fileName } = req.headers;

      const params = {
        data: req.body,
        KeywordId,
        fileName: decodeURIComponent(fileName),
      };

      const result = await service.keywordPhoto.createOne(params);

      res.json(result);
    } catch (error) {
      logger.error('[KeywordPhoto Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async modifyKeywordPhoto(req, res) {
    try {
      validator.validate(req.body, modifyRule);

      const result = await service.keywordPhoto.modifyOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[KeywordPhoto Controller] Failed to modify one:', error);
      res.status(400).json({ message: `Failed to modify one, ${error}` });
    }
  },

  async getKeywordPhoto(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const results = await service.keywordPhoto.getOne(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[KeywordPhoto Controller] Failed to get one:', error);
      res.status(400).json({ message: `Failed to get one, ${error}` });
    }
  },

  async getKeywordPhotos(req, res) {
    try {
      validator.validate(req.body, getsRule);

      const results = await service.keywordPhoto.getAll(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[KeywordPhoto Controller] Failed to get all:', error);
      res.status(400).json({ message: `Failed to get all, ${error}` });
    }
  },

  async removeKeywordPhoto(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.keywordPhoto.deleteOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[KeywordPhoto Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },
};

export default keywordPhotoController;
