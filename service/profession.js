import fs, { unlinkSync } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import model from '../models';
import logger from '../libs/logger';

const professionService = {
  async createOne(params) {
    try {
      const { data, userId, description } = params;
      const rootDir = process.cwd();
      const certificateUrl = `/certificate/${uuidv4()}_${decodeURIComponent(userId)}`;
      fs.writeFileSync(path.join(rootDir, certificateUrl), data);
      const result = await model.Profession.create({
        user_id: userId, certificate_url: certificateUrl, description,
      });
      logger.info('[Profession Service] Create one successfully');
      return result;
    } catch (error) {
      logger.error('[Profession Service] Failed to create one to database:', error);
      throw new Error(`[Profession Service] Failed to create one to database, ${error}`);
    }
  },

  async createOneArt(params) {
    try {
      const { data, OwnerId } = params;
      const rootDir = process.cwd();
      const artworkUrl = `/artworks/${uuidv4()}_${decodeURIComponent(OwnerId)}`;
      fs.writeFileSync(path.join(rootDir, artworkUrl), data);
      const result = await model.Artwork.create({
        artwork_url: artworkUrl, profession_id: OwnerId,
      });
      logger.info('[Profession Service] Create one artwork successfully');
      return result;
    } catch (error) {
      logger.error('[Profession Service] Failed to create artwork to database:', error);
      throw new Error(`[Profession Service] Failed to create artwork to database, ${error}`);
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

  async getAllArt(params) {
    try {
      const {
        filter, limit, skip, sort = { order: -1 },
      } = params;

      const total = await model.Artwork.countDocuments(filter).lean();
      const data = await model.Artwork.find(filter, null, { limit, skip, sort }).lean();

      logger.info('[Profession Service] Find all art successfully');
      return { total, data };
    } catch (error) {
      logger.error('[Profession Service] Failed to find all art in database:', error);
      throw new Error(`[Profession Service] Failed to find all art in database, ${error}`);
    }
  },

  async deleteOne(filter) {
    try {
      const findResult = await model.Profession.findOne(filter).lean();
      const { user_id: userId, certificate_url: certificateUrl } = findResult;
      // delete certificate
      const rootDir = process.cwd();
      unlinkSync(path.join(rootDir, certificateUrl), (error) => {
        if (error) throw error;
      });
      // delete all artworks
      const artfindResult = await model.Artwork.find(filter).lean();
      if (artfindResult.length > 0) {
        artfindResult.forEach((artwork) => {
          const { artwork_url: artworkUrl } = artwork;
          unlinkSync(path.join(rootDir, artworkUrl), (error) => {
            if (error) throw error;
          });
        });
      }
      // delete user info
      // const userResult = await model.User.deleteOne({ user_id: userId }).lean();
      // FIXME: function about user not done yet
      // delete profession info
      const professionResult = await model.Profession.deleteOne(filter).lean();
      logger.info('[Profession Service] Delete one successfully');

      return { success: professionResult.deletedCount > 0 };
    } catch (error) {
      logger.error('[Profession Service] Failed to delete one in database:', error);
      throw new Error(`[Profession Service] Failed to delete one in database, ${error}`);
    }
  },

  async deleteAllArts(filter) {
    try {
      const findResult = await model.Artwork.find(filter).lean();
      if (findResult.length > 0) {
        const rootDir = process.cwd();
        findResult.forEach((artwork) => {
          const { artwork_url: artworkUrl } = artwork;
          unlinkSync(path.join(rootDir, artworkUrl), (error) => {
            if (error) throw error;
          });
        });
      }
      logger.info('[Profession Service] Delete all arts successfully');

      return ;
    } catch (error) {
      logger.error('[Profession Service] Failed to delete all arts in database:', error);
      throw new Error(`[Profession Service] Failed to delete all arts in database, ${error}`);
    }
  },
};

export default professionService;
