import model from '../models';
import logger from '../libs/logger';

const absoluteScoreService = {
  async createOne(params) {
    try {
      const result = await model.AbsoluteScore.create(params);

      logger.info('[AbsoluteScore Service] Create one successfully');
      return result;
    } catch (error) {
      logger.error('[AbsoluteScore Service] Failed to create one to database:', error);
      throw new Error(`[AbsoluteScore Service] Failed to create one to database, ${error}`);
    }
  },

  async modifyOne(filter) {
    try {
      const { _id } = filter;

      const result = await model.AbsoluteScore.updateOne({ _id }, filter).lean();

      logger.info('[AbsoluteScore Service] modify one successfully');
      return result;
    } catch (error) {
      logger.error('[AbsoluteScore Service] Failed to modify one in database:', error);
      throw new Error(`[AbsoluteScore Service] Failed to modify one in database, ${error}`);
    }
  },

  async getOne(filter) {
    try {
      const result = await model.AbsoluteScore.findOne(filter).lean();

      logger.info('[AbsoluteScore Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[AbsoluteScore Service] Failed to find one in database:', error);
      throw new Error(`[AbsoluteScore Service] Failed to find one in database, ${error}`);
    }
  },

  async getAll(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.AbsoluteScore.countDocuments(filter).lean();
      const data = await model.AbsoluteScore.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[AbsoluteScore Service] Find all successfully');
      return { total, data };
    } catch (error) {
      logger.error('[AbsoluteScore Service] Failed to find all in database:', error);
      throw new Error(`[AbsoluteScore Service] Failed to find all in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const result = await model.AbsoluteScore.deleteOne(filter).lean();

      logger.info('[AbsoluteScore Service] Delete one successfully');
      return { success: result.deletedCount > 0 };
    } catch (error) {
      logger.error('[AbsoluteScore Service] Failed to delete one in database:', error);
      throw new Error(`[AbsoluteScore Service] Failed to delete one in database, ${error}`);
    }
  },
};

export default absoluteScoreService;
