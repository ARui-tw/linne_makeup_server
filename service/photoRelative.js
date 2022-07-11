import model from '../models';
import logger from '../libs/logger';

const photoRelativeService = {
  async createOne(params) {
    try {
      const result = await model.PhotoRelative.create(params);

      logger.info('[PhotoRelative Service] Create one successfully');
      return result;
    } catch (error) {
      logger.error('[PhotoRelative Service] Failed to create one to database:', error);
      throw new Error(`[PhotoRelative Service] Failed to create one to database, ${error}`);
    }
  },

  async modifyOne(filter) {
    try {
      const { _id } = filter;

      const result = await model.PhotoRelative.updateOne({ _id }, filter).lean();

      logger.info('[PhotoRelative Service] modify one successfully');
      return result;
    } catch (error) {
      logger.error('[PhotoRelative Service] Failed to modify one in database:', error);
      throw new Error(`[PhotoRelative Service] Failed to modify one in database, ${error}`);
    }
  },

  async getOne(filter) {
    try {
      const result = await model.PhotoRelative.findOne(filter).lean();

      logger.info('[PhotoRelative Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[PhotoRelative Service] Failed to find one in database:', error);
      throw new Error(`[PhotoRelative Service] Failed to find one in database, ${error}`);
    }
  },

  async getAll(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.PhotoRelative.countDocuments(filter).lean();
      const data = await model.PhotoRelative.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[PhotoRelative Service] Find all successfully');
      return { total, data };
    } catch (error) {
      logger.error('[PhotoRelative Service] Failed to find all in database:', error);
      throw new Error(`[PhotoRelative Service] Failed to find all in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const result = await model.PhotoRelative.deleteOne(filter).lean();

      logger.info('[PhotoRelative Service] Delete one successfully');
      return { success: result.deletedCount > 0 };
    } catch (error) {
      logger.error('[PhotoRelative Service] Failed to delete one in database:', error);
      throw new Error(`[PhotoRelative Service] Failed to delete one in database, ${error}`);
    }
  },
};

export default photoRelativeService;
