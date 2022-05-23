import { Request } from 'express';

import { verifyToken } from 'utils/authToken';
import { catchErrors, InvalidSession, InvalidTokenError } from 'errors';
import { User } from 'entities';
import redis from 'utils/redisConnect';

export const authenticateUser = catchErrors(async (req, _res, next) => {
  const token = getAuthTokenFromRequest(req);

  if (!token) {
    throw new InvalidTokenError('Authentication token not found.');
  }
  const userId = verifyToken(token).sub;
  if (!userId) {
    throw new InvalidTokenError('Authentication token is invalid.');
  }

  // Check if the user has a valid session
  const session = await redis.get(userId);
  console.log(session);
  if (!session) {
    throw new InvalidSession(`Invalid token or session has expired`);
  }

  const user = await User.findOne(userId);
  if (!user) {
    throw new InvalidTokenError('Authentication token is invalid: User not found.');
  }

  req.currentUser = user;

  // Add user to res.locals
  _res.locals.user = user;

  next();
});

export const requireUser = catchErrors(async (req, _res, next) => {
  const user = _res.locals.user;

  if (!user) {
    throw new InvalidSession(`Session has expired or user doesn't exist`);
  }

  next();
});

const getAuthTokenFromRequest = (req: Request): string | null => {
  const header = req.get('Authorization') || '';
  const [bearer, token] = header.split(' ');
  return bearer === 'Bearer' && token ? token : null;
};
