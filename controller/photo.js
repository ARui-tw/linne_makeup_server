import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

const createRule = {
  url: {
    type: 'forbidden',
  },
  userId: {
    type: 'string',
  },
  keyword_id: {
    type: 'string',
    optional: true,
  },
  customize_keyword: {
    type: 'string',
    optional: true,
  },
  score: {
    type: 'forbidden',
  },
  photoType: {
    type: 'enum',
    values: ['before', 'after'],
  },
  fileName: {
    type: 'string',
  },
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
  customize_keyword: {
    type: 'string',
    optional: true,
  },
  score: {
    type: 'number',
    optional: true,
  },
  photo_type: {
    type: 'enum',
    values: ['before', 'after'],
    optional: true,
  },
};

const photoController = {
  async createPhoto(req, res) {
    const { headers, body, user } = req;
    const {
      filename: fileName,
      photo_type: photoType,
      keyword_id: keywordId,
      customize_keyword: customizeKeyword,
    } = headers;

    const params = {
      photo: body,
      data: {
        userId: user._id,
        fileName: decodeURIComponent(fileName),
        photoType,
        keywordId,
        customizeKeyword: decodeURIComponent(customizeKeyword),
      },
    };

    try {
      validator.validate(params.data, createRule);

      const result = await service.photo.createOne(params);

      res.json(result);
    } catch (error) {
      logger.error('[Photo Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async modifyPhoto(req, res) {
    try {
      validator.validate(req.body, modifyRule);

      const result = await service.photo.modifyOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Photo Controller] Failed to modify one:', error);
      res.status(400).json({ message: `Failed to modify one, ${error}` });
    }
  },

  async getPhoto(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const results = await service.photo.getOne(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[Photo Controller] Failed to get one:', error);
      res.status(400).json({ message: `Failed to get one, ${error}` });
    }
  },

  async getRandomPhoto(req, res) {
    const { size } = req.body;
    try {
      validator.validate({ size }, { size: { type: 'number' } });

      const results = await service.photo.getRandom(size);

      res.json(results);
    } catch (error) {
      logger.error('[Photo Controller] Failed to get random:', error);
      res.status(400).json({ message: `Failed to get random, ${error}` });
    }
  },

  async getPhotos(req, res) {
    try {
      validator.validate(req.body, getsRule);

      const results = await service.photo.getAll(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[Photo Controller] Failed to get all:', error);
      res.status(400).json({ message: `Failed to get all, ${error}` });
    }
  },

  async removePhoto(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.photo.deleteOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Photo Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },
};

export default photoController;
