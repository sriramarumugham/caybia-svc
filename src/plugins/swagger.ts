import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'SVC',
        description: '',
        version: '0.1.0',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
          },
        },
      },
    },
    hideUntagged: false,
  });
  fastify.register(swaggerUi);
});
