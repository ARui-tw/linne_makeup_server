import model from '../models';
import logger from '../libs/logger';
import fileOperator from '../libs/fileOperator';

const photoService = {
  async createOne(params) {
    try {
      const { photo, data } = params;
      const { userId, fileName, photoType } = data;

      const photoUrl = await fileOperator.fileSaver('photo', fileName, photo);

      const createResult = await model.Photo.create({
        url: photoUrl, provided_user: userId, photo_type: photoType,
      });

      logger.info('[Photo Service] Create one photo successfully');
      return createResult;
    } catch (error) {
      logger.error('[Photo Service] Failed to create photo to database:', error);
      throw new Error(`[Photo Service] Failed to create photo to database, ${error}`);
    }
  },

  async modifyOne(filter) {
    try {
      const { _id } = filter;

      const result = await model.Photo.updateOne({ _id }, filter).lean();

      logger.info('[Photo Service] modify one successfully');
      return result;
    } catch (error) {
      logger.error('[Photo Service] Failed to modify one in database:', error);
      throw new Error(`[Photo Service] Failed to modify one in database, ${error}`);
    }
  },

  async getOne(filter) {
    try {
      const result = await model.Photo.findOne(filter).lean();

      logger.info('[Photo Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[Photo Service] Failed to find one in database:', error);
      throw new Error(`[Photo Service] Failed to find one in database, ${error}`);
    }
  },

  async getAll(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.Photo.countDocuments(filter).lean();
      const data = await model.Photo.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[Photo Service] Find all successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Photo Service] Failed to find all in database:', error);
      throw new Error(`[Photo Service] Failed to find all in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const findResult = await model.Photo.findOne(filter).lean();

      if (findResult) {
        const { url } = findResult;
        fileOperator.fileDeleter(url);
      }

      const artDeleteResult = await model.Photo.deleteOne(filter).lean();
      logger.info('[Photo Service] Delete one photo successfully');

      return { success: artDeleteResult.deletedCount > 0 };
    } catch (error) {
      logger.error('[Photo Service] Failed to delete one photo in database:', error);
      throw new Error(`[Photo Service] Failed to delete one photo in database, ${error}`);
    }
  },
};

export default photoService;
