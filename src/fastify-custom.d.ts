import { FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    authData: any;
  }
}
