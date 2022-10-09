import model from '../models';
import logger from '../libs/logger';

const relativeScoreService = {
  async createOne(params) {
    try {
      const result = await model.RelativeScore.create(params);

      logger.info('[RelativeScore Service] Create one successfully');
      return result;
    } catch (error) {
      logger.error('[RelativeScore Service] Failed to create one to database:', error);
      throw new Error(`[RelativeScore Service] Failed to create one to database, ${error}`);
    }
  },

  async modifyOne(filter) {
    try {
      const { _id } = filter;

      const result = await model.RelativeScore.updateOne({ _id }, filter).lean();

      logger.info('[RelativeScore Service] modify one successfully');
      return result;
    } catch (error) {
      logger.error('[RelativeScore Service] Failed to modify one in database:', error);
      throw new Error(`[RelativeScore Service] Failed to modify one in database, ${error}`);
    }
  },

  async getOne(filter) {
    try {
      const result = await model.RelativeScore.findOne(filter).lean();

      logger.info('[RelativeScore Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[RelativeScore Service] Failed to find one in database:', error);
      throw new Error(`[RelativeScore Service] Failed to find one in database, ${error}`);
    }
  },

  async getAll(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.RelativeScore.countDocuments(filter).lean();
      const data = await model.RelativeScore.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[RelativeScore Service] Find all successfully');
      return { total, data };
    } catch (error) {
      logger.error('[RelativeScore Service] Failed to find all in database:', error);
      throw new Error(`[RelativeScore Service] Failed to find all in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const professionResult = await model.RelativeScore.deleteOne(filter).lean();

      logger.info('[RelativeScore Service] Delete one successfully');
      return { success: professionResult.deletedCount > 0 };
    } catch (error) {
      logger.error('[RelativeScore Service] Failed to delete one in database:', error);
      throw new Error(`[RelativeScore Service] Failed to delete one in database, ${error}`);
    }
  },
};

export default relativeScoreService;
