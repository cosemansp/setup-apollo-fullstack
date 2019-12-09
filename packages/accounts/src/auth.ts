import { User } from './domain/userModel';
import { sign } from 'jsonwebtoken';
import config from '@/config';

export const createAccessToken = (user: User) => {
  return sign({ sub: user.id, email: user.email }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user: User) => {
  return sign({ sub: user.id }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};
