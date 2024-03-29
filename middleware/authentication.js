import jwt from 'jsonwebtoken';
import fs from 'fs';
import logger from '../libs/logger';

const publicKeyLocation = process.env.PUBLIC_KEY_LOCATION;
const rootDir = process.cwd();
const publicKey = fs.readFileSync(`${rootDir}${publicKeyLocation}`);

const AuthenticationMiddleware = (checkLevel, stricted = true) => async (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    try {
      const token = auth.slice(7);
      const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      const { rank } = payload;

      if (!(rank === 'admin') && checkLevel === 'admin') { throw new Error('User not Admin'); }

      req.user = payload;
      next();
    } catch (error) {
      logger.error(
        `[Authentication Middleware] Authentifaction failed, invalid token, error: ${error}.`,
      );
      res.status(401).json({ message: 'Authentication failed.' });
    }
  } else if (stricted) {
    logger.error(
      '[Authentication Middleware] Authentifaction failed, no token carried.',
    );
    res.status(401).json({ message: 'Authentication failed.' });
  } else {
    req.user = {};
    next();
  }
};

export default AuthenticationMiddleware;
