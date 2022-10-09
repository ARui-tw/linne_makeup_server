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
    type: 'email',
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
    type: 'forbidden',
  },
  description: {
    type: 'string',
    optional: true,
  },
};

const adminModifyRule = {
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
        title: decodeURIComponent(title),
        name: decodeURIComponent(name),
        phone: decodeURIComponent(phone),
        email: decodeURIComponent(email),
        password: 'profession',
      };

      validator.validate(UserInfo, UserInfoRule);

      const UserResult = await service.user.createOne(UserInfo);
      const { _id: userId } = UserResult;

      const params = {
        data: req.body,
        userId,
        description,
        fileName,
        imagePhotoId,
      };

      const result = await service.profession.createOne(params);

      const { _id: professionId } = result;
      const modifyParams = {
        _id: userId,
        profession_id: professionId,
      };
      await service.user.modifyOne(modifyParams);

      res.json(result);
    } catch (error) {
      logger.error('[Profession Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async modifyProfession(req, res) {
    try {
      // eslint-disable-next-line camelcase
      const userId = req.user._id;
      // eslint-disable-next-line camelcase
      const user = await service.user.getOne({ _id: userId });

      if (!user || user.rank !== 'admin') {
        validator.validate(req.body, modifyRule);
      } else {
        validator.validate(req.body, adminModifyRule);
      }

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

      await Promise.all(results.data.map(async (item, index) => {
        const userResult = await service.user.getOne({ _id: item.user_id });
        results.data[index].title = userResult.title;

        const imageResult = await service.artwork.getOneArt({ _id: item.imagePhotoId });
        results.data[index].imagePhotoUrl = imageResult.artwork_url;
      }));

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

      const userDeleteResult = await service.user.deleteOne({ profession_id: _id });
      const professionDeleteResult = await service.profession.deleteOne(req.body);
      const artworkDeleteResult = await service.artwork.deleteAllArts({ profession_id: _id });

      const { success } = artworkDeleteResult;
      if (!success) {
        logger.info('[Profession Controller] No artwork found');
      }

      const { success: PDRsuccess } = professionDeleteResult;
      const { success: UDRsuccess } = userDeleteResult;

      res.json({ success: PDRsuccess && UDRsuccess });
    } catch (error) {
      logger.error('[Profession Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },
};

export default professionController;
