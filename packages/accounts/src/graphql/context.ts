import { Request } from 'express';
import { UserDataSource } from '../dataSources/userDataSource';

export interface JWTPayload {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export interface User extends JWTPayload {}

export interface Context {
  req: Request;
  user: User;
  dataSources: {
    user: UserDataSource;
  };
}
