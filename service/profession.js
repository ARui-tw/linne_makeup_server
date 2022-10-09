import fileOperator from '../libs/fileOperator';
import model from '../models';
import logger from '../libs/logger';

const professionService = {
  async createOne(params) {
    try {
      const {
        data, userId, description, fileName, imagePhotoId,
      } = params;

      const certificateUrl = await fileOperator.fileSaver('certificate', fileName, data);

      const result = await model.Profession.create({
        user_id: decodeURIComponent(userId),
        certificate_url: decodeURIComponent(certificateUrl),
        description: decodeURIComponent(description),
        imagePhotoId,
      });

      logger.info('[Profession Service] Create one successfully');
      return result;
    } catch (error) {
      logger.error('[Profession Service] Failed to create one to database:', error);
      throw new Error(`[Profession Service] Failed to create one to database, ${error}`);
    }
  },

  async modifyOne(filter) {
    try {
      const { _id } = filter;

      const result = await model.Profession.updateOne({ _id }, filter).lean();

      logger.info('[Profession Service] modify one successfully');
      return result;
    } catch (error) {
      logger.error('[Profession Service] Failed to modify one in database:', error);
      throw new Error(`[Profession Service] Failed to modify one in database, ${error}`);
    }
  },

  async getOne(filter) {
    try {
      const result = await model.Profession.findOne(filter).lean();

      logger.info('[Profession Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[Profession Service] Failed to find one in database:', error);
      throw new Error(`[Profession Service] Failed to find one in database, ${error}`);
    }
  },

  async getAll(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.Profession.countDocuments(filter).lean();
      const data = await model.Profession.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[Profession Service] Find all successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Profession Service] Failed to find all in database:', error);
      throw new Error(`[Profession Service] Failed to find all in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const findResult = await model.Profession.findOne(filter).lean();

      if (findResult) {
        const { certificate_url: certificateUrl } = findResult;
        fileOperator.fileDeleter(certificateUrl);
      }

      const professionResult = await model.Profession.deleteOne(filter).lean();
      logger.info('[Profession Service] Delete one successfully');

      return { success: professionResult.deletedCount > 0 };
    } catch (error) {
      logger.error('[Profession Service] Failed to delete one in database:', error);
      throw new Error(`[Profession Service] Failed to delete one in database, ${error}`);
    }
  },
};

export default professionService;
