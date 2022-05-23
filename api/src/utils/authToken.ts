import jwt, { SignOptions } from 'jsonwebtoken';
import { isPlainObject } from 'lodash';
import { InvalidTokenError } from 'errors';
import { User } from 'entities';
import redisClient from './redisConnect';

//  Sign access and Refresh Tokens
export const signTokens = async (user: User | any) => {
  // 1. Create Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: 60 * 60,
  });

  // 2. Create Access and Refresh tokens
  const access_token = signToken(
    { sub: user.id },
    {
      expiresIn: `180 days`,
    },
  );

  const refresh_token = signToken(
    { sub: user.id },
    {
      expiresIn: `365 days`,
    },
  );

  return { access_token, refresh_token };
};

export const signToken = (payload: object, options?: SignOptions): string =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '180 days',
    ...options,
  });

export const verifyToken = (token: string): { [key: string]: any } => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (isPlainObject(payload)) {
      return payload as { [key: string]: any };
    }
    throw new Error();
  } catch (error) {
    throw new InvalidTokenError();
  }
};
