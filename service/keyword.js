import model from '../models';
import logger from '../libs/logger';

const keywordService = {
  async createOne(params) {
    try {
      const { name } = params;

      const result = await model.Keyword.create({ name });

      logger.info('[Keyword Service] Create one successfully');
      return result;
    } catch (error) {
      logger.error('[Keyword Service] Failed to create keyword to database:', error);
      throw new Error(`[Keyword Service] Failed to create keyword to database, ${error}`);
    }
  },

  async modifyOne(params) {
    try {
      const { _id, name } = params;

      const result = await model.Keyword.updateOne({ _id }, { name }).lean();

      logger.info('[Keyword Service] Modify one successfully');
      return result;
    } catch (error) {
      logger.error('[Keyword Service] Failed to modify keyword to database:', error);
      throw new Error(`[Keyword Service] Failed to modify keyword to database, ${error}`);
    }
  },

  async getOne(filter) {
    try {
      const result = await model.Keyword.findOne(filter).lean();

      logger.info('[Keyword Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[Keyword Service] Failed to find keyword in database:', error);
      throw new Error(`[Keyword Service] Failed to find keyword in database, ${error}`);
    }
  },

  async getAll(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.Keyword.countDocuments(filter).lean();
      const data = await model.Keyword.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[Keyword Service] Find keywords successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Keyword Service] Failed to find keywords in database:', error);
      throw new Error(`[Keyword Service] Failed to find keywords in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const result = await model.Keyword.deleteOne(filter).lean();

      logger.info('[Keyword Service] Delete keyword successfully');
      return { success: result.deletedCount > 0 };
    } catch (error) {
      logger.error('[Keyword Service] Failed to delete keyword in database:', error);
      throw new Error(`[Keyword Service] Failed to delete keyword in database, ${error}`);
    }
  },
};

export default keywordService;
