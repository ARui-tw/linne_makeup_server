import crypto from 'crypto-js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import logger from '../libs/logger';
import model from '../models';

const privateKeyLocation = process.env.PRIVATE_KEY_LOCATION;
const rootDir = process.cwd();
const privateKey = fs.readFileSync(`${rootDir}${privateKeyLocation}`);

const userService = {
  async createOne(params) {
    try {
      const result = await model.User.create(params);

      logger.info('[User Service] Create one successfully');
      return result;
    } catch (error) {
      logger.error('[User Service] Failed to create one to database:', error);
      throw new Error(`[User Service] Failed to create one to database, ${error}`);
    }
  },

  async login(params) {
    try {
      const { name, password: inputPassword } = params;
      const user = await model.User.findOne({ name }).lean();
      const { _id, rank, password: DBPassword } = user;

      const md5 = crypto.createHash('md5');
      const md5Sum = md5.update(inputPassword);
      const cryptoPassword = md5Sum.digest();

      if (DBPassword === cryptoPassword) {
        const token = jwt.sign(
          { _id, rank },
          privateKey,
          { algorithm: 'RS256' },
        );
        logger.info('[User Service] login successfully');
        return { token };
      }

      return { success: false };
    } catch (error) {
      logger.error('[User Service] Failed to login:', error);
      throw new Error(`[User Service] Failed to login, ${error}`);
    }
  },

  async modifyOne(filter) {
    try {
      const { _id } = filter;

      const result = await model.User.updateOne({ _id }, filter).lean();

      logger.info('[User Service] modify one successfully');
      return result;
    } catch (error) {
      logger.error('[User Service] Failed to modify one in database:', error);
      throw new Error(`[User Service] Failed to modify one in database, ${error}`);
    }
  },

  async getOne(filter) {
    try {
      const result = await model.User.findOne(filter).lean();

      logger.info('[User Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[User Service] Failed to find one in database:', error);
      throw new Error(`[User Service] Failed to find one in database, ${error}`);
    }
  },

  async getAll(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.User.countDocuments(filter).lean();
      const data = await model.User.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[User Service] Find all successfully');
      return { total, data };
    } catch (error) {
      logger.error('[User Service] Failed to find all in database:', error);
      throw new Error(`[User Service] Failed to find all in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const result = await model.User.deleteOne(filter).lean();

      logger.info('[User Service] Delete one successfully');
      return { success: result.deletedCount > 0 };
    } catch (error) {
      logger.error('[User Service] Failed to delete one in database:', error);
      throw new Error(`[User Service] Failed to delete one in database, ${error}`);
    }
  },

  async userExist(params, expectedId = null) {
    const { name, password: inputPassword } = params;

    const md5 = crypto.createHash('md5');
    const md5Sum = md5.update(inputPassword);
    const cryptoPassword = md5Sum.digest();

    const result = await model.User.countDocuments({
      _id: {
        $ne: expectedId,
      },
      $or: [{ name }, { password: cryptoPassword }],
    });

    return result > 0;
  },
};

export default userService;
