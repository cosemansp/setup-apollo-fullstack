export interface JWTPayload {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export interface User extends JWTPayload {}

export interface Context {
  user: User;
}
