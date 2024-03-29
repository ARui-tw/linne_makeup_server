import crypto from 'crypto-js';
import service from '../service';
import logger from '../libs/logger';
import validator from '../libs/validator';

// rule components
const idRule = {
  type: 'multi',
  rules: [{ type: 'string' }, { type: 'object' }],
};

const registerRule = {
  name: {
    type: 'string',
    empty: false,
  },
  password: {
    type: 'string',
    empty: false,
  },
  title: {
    type: 'string',
    optional: true,
  },
  phone: {
    type: 'string',
    optional: true,
  },
  email: {
    type: 'email',
    optional: true,
  },
  profession_id: {
    type: 'string',
    optional: true,
  },
  total_score_count: {
    type: 'forbidden',
  },
  total_upload_count: {
    type: 'forbidden',
  },
  rank: {
    type: 'forbidden',
  },
  certificate_applied_status: {
    type: 'forbidden',
  },
};

const loginRule = {
  name: {
    type: 'string',
    empty: false,
  },
  password: {
    type: 'string',
    empty: false,
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
  title: {
    type: 'string',
    optional: true,
  },
  name: {
    type: 'string',
    optional: true,
  },
  password: {
    type: 'string',
    optional: true,
  },
  nick_name: {
    type: 'string',
    optional: true,
  },
  phone: {
    type: 'string',
    optional: true,
  },
  email: {
    type: 'email',
    optional: true,
  },
  post_address: {
    type: 'string',
    optional: true,
  },
  profession_id: {
    type: 'string',
    optional: true,
  },
  total_score_count: {
    type: 'number',
    optional: true,
  },
  total_upload_count: {
    type: 'number',
    optional: true,
  },
  rank: {
    type: 'enum',
    values: ['user', 'profession', 'admin'],
    optional: true,
  },
  certificate_applied_status: {
    type: 'enum',
    values: ['none', 'score', 'photo', 'both'],
    optional: true,
  },
};

const modifyCurrentRule = {
  title: {
    type: 'string',
    optional: true,
  },
  name: {
    type: 'string',
    optional: true,
  },
  password: {
    type: 'string',
    optional: true,
  },
  nick_name: {
    type: 'string',
    optional: true,
  },
  phone: {
    type: 'string',
    optional: true,
  },
  email: {
    type: 'email',
    optional: true,
  },
  post_address: {
    type: 'string',
    optional: true,
  },
  profession_id: {
    type: 'forbidden',
  },
  total_score_count: {
    type: 'forbidden',
  },
  total_upload_count: {
    type: 'forbidden',
  },
  rank: {
    type: 'forbidden',
  },
  certificate_applied_status: {
    type: 'forbidden',
  },
};

const userController = {
  async register(req, res) {
    try {
      validator.validate(req.body, registerRule);
      const { name, password } = req.body;

      const cryptoPassword = crypto.MD5(password).toString();

      if (await service.user.userExist({ name })) { throw new Error('Cannot create user, duplicate name.'); }

      req.body.password = cryptoPassword;
      const result = await service.user.createOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to create one:', error);
      res.status(400).json({ message: `Failed to create one, ${error}` });
    }
  },

  async login(req, res) {
    try {
      validator.validate(req.body, loginRule);
      const { password } = req.body;

      const cryptoPassword = crypto.MD5(password).toString();

      req.body.password = cryptoPassword;
      const result = await service.user.login(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to login:', error);
      res.status(400).json({ message: `Failed to login, ${error}` });
    }
  },

  async modifyUser(req, res) {
    try {
      validator.validate(req.body, modifyRule);
      const { password } = req.body;

      if (password) {
        const cryptoPassword = crypto.MD5(password).toString();
        req.body.password = cryptoPassword;
        console.log('cryptoPassword', cryptoPassword);
        console.log('password', password);
      }

      const result = await service.user.modifyOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to modify one:', error);
      res.status(400).json({ message: `Failed to modify one, ${error}` });
    }
  },

  async modifyCurrentUser(req, res) {
    try {
      validator.validate(req.body, modifyCurrentRule);
      const userID = req.user._id;
      const { password } = req.body;

      if (password) {
        const cryptoPassword = crypto.MD5(password).toString();
        req.body.password = cryptoPassword;
      }

      if (await service.user.userExist(req.body, userID)) { throw new Error('Cannot modify user, duplicate user data.'); }

      const params = {
        ...req.body, _id: userID,
      };
      const result = await service.user.modifyOne(params);

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to modify current one:', error);
      res.status(400).json({ message: `Failed to modify current one, ${error}` });
    }
  },

  async getUser(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.user.getOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to get one:', error);
      res.status(400).json({ message: `Failed to get one, ${error}` });
    }
  },

  async getCurrentUser(req, res) {
    if (req.user) {
      const result = await service.user.getOne({ _id: req.user._id });

      res.json(result);
    } else {
      logger.error('[User Controller] not logged in yet');
      res.status(400).json({ message: 'Hello, not logged in yet.' });
    }
  },

  async getUsers(req, res) {
    try {
      validator.validate(req.body, getsRule);

      const result = await service.user.getAll(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to get all:', error);
      res.status(400).json({ message: `Failed to get all, ${error}` });
    }
  },

  async removeUser(req, res) {
    try {
      validator.validate(req.body, { _id: idRule });

      const result = await service.user.deleteOne(req.body);

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to remove one:', error);
      res.status(400).json({ message: `Failed to remove one, ${error}` });
    }
  },

  async email(req, res) {
    try {
      const userID = req.user._id;
      const { type } = req.body;
      const result = await service.user.email(userID, type);

      res.json(result);
    } catch (error) {
      logger.error('[User Controller] Failed to send email:', error);
      res.status(400).json({ message: `Failed to send email, ${error}` });
    }
  },
};

export default userController;
