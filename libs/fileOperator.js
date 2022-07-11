import fs, { unlinkSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const fileOperator = {
  async fileDeleter(filePath) {
    const rootDir = process.cwd();
    unlinkSync(path.join(rootDir, filePath), (error) => {
      if (error) throw error;
    });
  },
  async fileSaver(folderName, Id, data) {
    const rootDir = process.cwd();
    const Url = `/${folderName}/${uuidv4()}_${Id}`;
    fs.writeFileSync(path.join(rootDir, Url), data);
    return Url;
  },
};

export default fileOperator;
