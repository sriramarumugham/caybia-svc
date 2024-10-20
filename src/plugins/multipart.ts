import multipart from '@fastify/multipart';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(multipart, {
    attachFieldsToBody: true,
    limits: { fileSize: 1024 * 1024 * 25 },
  });
});
