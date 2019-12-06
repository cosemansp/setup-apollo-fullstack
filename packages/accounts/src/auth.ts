import { User } from './domain/user';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User) => {
  sign({ sub: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user: User) => {
  sign({ sub: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};
