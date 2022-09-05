import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import logger from './logger';

const fileOperator = {
  async fileDeleter(filePath) {
    const rootDir = process.cwd();
    try {
      await fs.promises.unlink(path.join(rootDir, filePath));
    } catch (error) {
      logger.error('[File Operator] Failed to delete file:', error);
      throw new Error(`[File Operator] Failed to delete file, ${error}`);
    }
  },
  async fileSaver(inputType, fileName, data) {
    const rootDir = process.cwd();
    const Url = `/public/${inputType}/${uuidv4()}_${decodeURIComponent(fileName)}`;
    fs.writeFileSync(path.join(rootDir, Url), data);
    return Url;
  },
};

export default fileOperator;
