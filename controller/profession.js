import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

const UserInfoRule = {
  title: {
    type: 'string',
    optional: true,
  },
  name: {
    type: 'string',
    empty: false,
  },
  phone: {
    type: 'string',
    optional: true,
  },
  email: {
    type: 'string',
    optional: true,
  },
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
  verified: {
    type: 'boolean',
    optional: true,
  },
  description: {
    type: 'string',
    optional: true,
  },
};

const professionController = {
  async createProfession(req, res) {
    try {
      const {
        title, name, phone, email, description,
      } = req.headers;
      const UserInfo = {
        title, name, phone, email,
      };
      validator.validate(UserInfo, UserInfoRule);
      // const UserResult = await service.user.createOne(UserInfo);
      // const { _id: UserId } = UserResult;
      // FIXME: create a new user account
      const params = {
        data: req.body,
        // user_id: UserId, // FIXME: user.createOne not done yet
        userId: '62c0f2970b6eae7fa95c9722', // fake user
        description,
      };

      const result = await service.profession.createOne(params);

      logger.info('[Profession Controller] create one successfully');
      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async CreateArtwork(req, res) {
    try {
      const { profession_id: OwnerId } = req.headers;

      const params = {
        data: req.body,
        OwnerId,
      };

      const result = await service.profession.createOneArt(params);

      logger.info('[Profession Controller] create one Art successfully');
      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to create one Art:', error);
      res.status(400).json({ message: `Failed to create one Art, ${error}` });
    }
  },

  async modifyProfession(req, res) {
    try {
      validator.validate(req.body, modifyRule);

      const result = await service.profession.modifyOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to modify one:', error);
      res.status(400).json({ message: `Failed to modify one, ${error}` });
    }
  },

  async getProfession(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.profession.getOne(req.body);

      logger.info('[Profession Controller] get one successfully');
      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to get one:', error);
      res.status(400).json({ message: `Failed to get one, ${error}` });
    }
  },

  async getProfessions(req, res) {
    try {
      validator.validate(req.body, GetsRule);

      const results = await service.profession.getAll(req.body);

      logger.info('[Profession Controller] get all successfully');
      res.json(results);
    } catch (error) {
      logger.error('[Profession Controller] Failed to get all:', error);
      res.status(400).json({ message: `Failed to get all, ${error}` });
    }
  },

  async GetArtworks(req, res) {
    try {
      validator.validate(req.body, GetsRule);

      const results = await service.profession.getAllArt(req.body);

      logger.info('[Profession Controller] get all Art successfully');
      res.json(results);
    } catch (error) {
      logger.error('[Profession Controller] Failed to get all Art:', error);
      res.status(400).json({ message: `Failed to get all Art, ${error}` });
    }
  },

  async removeProfession(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.profession.deleteOne(req.body);

      logger.info('[Profession Controller] Remove one successfully');
      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },

  async RemoveArtworks(req, res) {
    try {
      validator.validate(req.body, { profession_id: idRule });

      const result = await service.profession.deleteAllArts(req.body);

      logger.info('[Profession Controller] Remove one successfully');
      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },
};

export default professionController;
