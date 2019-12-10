import { AuthorizationError } from './errors';
import jwt from 'jsonwebtoken';

export const decodeToken = ({ context }) => {
  const req = context.req || context.request;
  if (!req || !req.headers || (!req.headers.authorization && !req.headers.Authorization)) {
    throw new AuthorizationError({ message: 'No authorization token.' });
  }

  // see if we have already a payload
  const payload = context.tokenPayload || context.user;
  if (payload) {
    return payload;
  }

  // get token from request and decode
  const authorization = req.headers.authorization || req.headers.Authorization;
  try {
    const idToken = authorization.split(' ')[1];
    console.time('test');
    const decoded = jwt.decode(idToken);
    console.timeEnd('test');
    return decoded;
  } catch (err) {
    throw new AuthorizationError({
      message: 'Invalid token',
    });
  }
};
