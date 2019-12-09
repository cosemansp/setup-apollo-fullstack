import { Request, Response } from 'express';
import { UserDataSource } from '../dataSources/userDataSource';

export interface JWTPayload {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export interface User extends JWTPayload {}

export interface Context {
  req: Request;
  res: Response;
  user?: User;
  dataSources: {
    user: UserDataSource;
  };
}
