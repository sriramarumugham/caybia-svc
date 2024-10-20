import { FastifyRequest } from 'fastify';

var jwt = require('jsonwebtoken');

export const signToken = (userId: string): string => {
  const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY!, {
    expiresIn: '24h',
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    console.log('DECODED__', decoded);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const getUserIdFromRequestHeader = (
  req: FastifyRequest,
): { userId: string } => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[0]; // Get the token part
  console.log('TOKNE__', token);
  const decodedToken = verifyToken(token);
  console.log('DECODED_TOKNE__', decodedToken);
  return decodedToken as { userId: string };
};
