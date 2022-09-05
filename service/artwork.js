import model from '../models';
import logger from '../libs/logger';
import fileOperator from '../libs/fileOperator';

const artworkService = {

  async createOneArt(params) {
    try {
      const { data, OwnerId, fileName } = params;

      const artworkUrl = await fileOperator.fileSaver('artworks', fileName, data);

      const result = await model.Artwork.create({
        artwork_url: artworkUrl, profession_id: OwnerId,
      });

      logger.info('[Artwork Service] Create one artwork successfully');
      return result;
    } catch (error) {
      logger.error('[Artwork Service] Failed to create artwork to database:', error);
      throw new Error(`[Artwork Service] Failed to create artwork to database, ${error}`);
    }
  },

  async modifyOneArt(filter) {
    try {
      const { _id } = filter;

      const result = await model.Artwork.updateOne({ _id }, filter).lean();

      logger.info('[Artwork Service] modify one successfully');
      return result;
    } catch (error) {
      logger.error('[Artwork Service] Failed to modify one in database:', error);
      throw new Error(`[Artwork Service] Failed to modify one in database, ${error}`);
    }
  },

  async getOneArt(filter) {
    try {
      const result = await model.Artwork.findOne(filter).lean();

      logger.info('[Artwork Service] Get one successfully');
      return result;
    } catch (error) {
      logger.error('[Artwork Service] Failed to find one in database:', error);
      throw new Error(`[Artwork Service] Failed to find one in database, ${error}`);
    }
  },

  async getAllArt(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.Artwork.countDocuments(filter).lean();
      const data = await model.Artwork.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[Artwork Service] Find all art successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Artwork Service] Failed to find all art in database:', error);
      throw new Error(`[Artwork Service] Failed to find all art in database, ${error}`);
    }
  },

  async deleteOneArt(filter) {
    try {
      const findResult = await model.Artwork.findOne(filter).lean();

      if (findResult) {
        const { artwork_url: artworkUrl } = findResult;
        fileOperator.fileDeleter(artworkUrl);
      }

      const artDeleteResult = await model.Artwork.deleteOne(filter).lean();
      logger.info('[Artwork Service] Delete one art successfully');

      return { success: artDeleteResult.deletedCount > 0 };
    } catch (error) {
      logger.error('[Artwork Service] Failed to delete one art in database:', error);
      throw new Error(`[Artwork Service] Failed to delete one art in database, ${error}`);
    }
  },

  async deleteAllArts(filter) {
    try {
      const findResult = await model.Artwork.find(filter).lean();

      findResult.forEach((artwork) => {
        const { artwork_url: artworkUrl } = artwork;
        fileOperator.fileDeleter(artworkUrl);
      });

      const artDeleteResult = await model.Artwork.deleteMany(filter).lean();
      logger.info('[Artwork Service] Delete all arts successfully');

      return artDeleteResult.deletedCount;
    } catch (error) {
      logger.error('[Artwork Service] Failed to delete all arts in database:', error);
      throw new Error(`[Artwork Service] Failed to delete all arts in database, ${error}`);
    }
  },
};

export default artworkService;
