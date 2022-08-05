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
  password: {
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
  certificate_url: {
    type: 'string',
    optional: true,
  },
  imagePhotoId: {
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
        title, name, phone, email, description, imagephotoid: imagePhotoId, filename: fileName,
      } = req.headers;
      const UserInfo = {
        title, name, phone, email, password: 'profession',
      };
      validator.validate(UserInfo, UserInfoRule);

      // TODO: create a new user account

      // const UserResult = await service.user.createOne(UserInfo);
      // const { _id: UserId } = UserResult;

      const params = {
        data: req.body,
        // UserId,
        userId: '62c0f2970b6eae7fa95c9722',
        description,
        fileName,
        imagePhotoId,
      };

      const result = await service.profession.createOne(params);

      // TODO: modify user account

      // const { _id: professionId } = result;
      // const modifyParams = {
      //   _id: UserId,
      //   profession_id: professionId,
      // };
      // const UserResult = await service.user.modifyOne(modifyParams);

      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async modifyProfession(req, res) {
    try {
      // TODO:
      // the verified should be only be able to be modified by admin.
      // the validation here might need to modify in the future.

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

      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to get one:', error);
      res.status(400).json({ message: `Failed to get one, ${error}` });
    }
  },

  async getProfessions(req, res) {
    try {
      validator.validate(req.body, getsRule);

      const results = await service.profession.getAll(req.body);

      res.json(results);
    } catch (error) {
      logger.error('[Profession Controller] Failed to get all:', error);
      res.status(400).json({ message: `Failed to get all, ${error}` });
    }
  },

  async removeProfession(req, res) {
    try {
      const { _id } = req.body;
      validator.validate(req.body, { _id: idRule });

      // const userDeleteResult = await service.user.deleteOne(req.body);
      const professionDeleteResult = await service.profession.deleteOne(req.body);
      const artworkDeleteResult = await service.artwork.deleteAllArts({ profession_id: _id });

      const { success } = artworkDeleteResult;
      if (!success) {
        logger.info('[Profession Controller] No artwork found');
      }

      res.json(professionDeleteResult);
    } catch (error) {
      logger.error('[Profession Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },
};

export default professionController;
