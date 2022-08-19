import model from '../models';
import logger from '../libs/logger';
import fileOperator from '../libs/fileOperator';

const keywordPhotoService = {

  async createOne(params) {
    try {
      const { data, KeywordId, fileName } = params;

      const photoUrl = await fileOperator.fileSaver('keywordPhoto', fileName, data);

      const result = await model.KeywordPhoto.create({
        url: photoUrl, keyword_id: KeywordId,
      });

      logger.info('[KeywordPhoto Service] Create one successfully');
      return result;
    } catch (error) {
      logger.error('[KeywordPhoto Service] Failed to create one to database:', error);
      throw new Error(`[KeywordPhoto Service] Failed to create one to database, ${error}`);
    }
  },

  async modifyOne(filter) {
    try {
      const { _id } = filter;

      const result = await model.KeywordPhoto.updateOne({ _id }, filter).lean();

      logger.info('[KeywordPhoto Service] modify one successfully');
      return result;
    } catch (error) {
      logger.error('[KeywordPhoto Service] Failed to modify one in database:', error);
      throw new Error(`[KeywordPhoto Service] Failed to modify one in database, ${error}`);
    }
  },

  async getOne(filter) {
    try {
      const result = await model.KeywordPhoto.findOne(filter).lean();

      logger.info('[KeywordPhoto Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[KeywordPhoto Service] Failed to find one in database:', error);
      throw new Error(`[KeywordPhoto Service] Failed to find one in database, ${error}`);
    }
  },

  async getAll(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.KeywordPhoto.countDocuments(filter).lean();
      const data = await model.KeywordPhoto.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[KeywordPhoto Service] Find all art successfully');
      return { total, data };
    } catch (error) {
      logger.error('[KeywordPhoto Service] Failed to find all in database:', error);
      throw new Error(`[KeywordPhoto Service] Failed to find all in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const result = await model.KeywordPhoto.deleteOne(filter).lean();

      logger.info('[KeywordPhoto Service] Delete one art successfully');
      return { success: result.deletedCount > 0 };
    } catch (error) {
      logger.error('[KeywordPhoto Service] Failed to delete one in database:', error);
      throw new Error(`[KeywordPhoto Service] Failed to delete one in database, ${error}`);
    }
  },
};

export default keywordPhotoService;
