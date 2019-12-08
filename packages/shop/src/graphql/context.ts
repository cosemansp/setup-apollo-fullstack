import { Request } from 'express';
import { BasketDataSource } from '@/dataSources/basketDataSource';
import { ProductDataSource } from '@/dataSources/productDataSource';

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
  dataSources?: {
    basket: BasketDataSource;
    products: ProductDataSource;
  };
}
