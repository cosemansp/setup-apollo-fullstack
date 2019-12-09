import { User } from './domain/userModel';
import { sign } from 'jsonwebtoken';
import config from '@/config';

export const createAccessTokenPayload = (user: User) => {
  return {
    accessToken: sign({ sub: user.id, email: user.email }, config.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    }),
    expires: 15 * 60 * 60,
  };
};

export const createRefreshToken = (user: User) => {
  return sign({ sub: user.id }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};
