import jwt from 'jsonwebtoken';
import fs from 'fs';
import nodemailer from 'nodemailer';
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
      const { name, password: inputCryptoPassword } = params;
      const user = await model.User.findOne({ name }).lean();
      if (user) {
        const { _id, rank, password: DBpassword } = user;

        if (DBpassword === inputCryptoPassword) {
          const token = jwt.sign(
            { _id, rank },
            privateKey,
            { algorithm: 'RS256' },
          );
          logger.info('[User Service] login successfully');
          return { token };
        }
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
    const { name } = params;

    const result = await model.User.countDocuments({
      _id: {
        $ne: expectedId,
      },
      $or: [{ name }],
    });

    return result > 0;
  },

  async email(userID, type) {
    const emailPassword = process.env.EMAIL_PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'linne.makeup.website@gmail.com',
        pass: emailPassword,
      },
    });

    let subject = '';
    let text = '';
    if (type === 'profession') {
      subject = '[專業夥伴申請]';
      text = `User ID: ${userID}`;
    } else if (type === 'upload_certificate') {
      subject = '[證書申請]';
      text = `上傳證書， User ID: ${userID}`;
    } else if (type === 'score_certificate') {
      subject = '[證書申請]';
      text = `評分證書，User ID: ${userID}`;
    }

    const mailOptions = {
      from: 'linne.makeup.website@gmail.com',
      to: 'linne.makeup.website@gmail.com',
      // to: 'eric89121306@gmail.com',
      subject,
      text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(`[User Service] Failed to send email: ${error}`);
      } else {
        logger.info(`[User Service] Email sent: ${info.response}`);
      }
    });
  },
};

export default userService;
