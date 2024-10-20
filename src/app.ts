import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import cors from '@fastify/cors';
import { config } from 'dotenv';

import 'module-alias/register';

import { FastifyPluginAsync } from 'fastify';

import { join } from 'path';

import { TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';
import { createNamespace } from 'cls-hooked';
import { connectDb } from './data-access/db/db.config';

export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {};

const currentUserNameSpace = createNamespace('current-user');

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  void fastify.setValidatorCompiler(TypeBoxValidatorCompiler);

  await fastify.register(cors, {
    origin: ['*'],
    allowedHeaders: '*',
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, './plugins'),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, './entrypoints/http/routes'),
    options: { ...options, prefix: 'caybia/api/v1' },
  });

  void fastify.setErrorHandler(async (error, request, reply) => {
    console.error('Raw Error:', error);
    const isValidationError = !!error.validation;
    if (isValidationError) {
      const errorFields = error?.validation?.map((v) => ({
        field: v.instancePath,
        message: v.message,
      }));

      const response = {
        status: 'Bad Request',
        message: 'Validation error occurred',
        timestamp: new Date().toISOString(),
        errorSource: 'Validation',
        errors: errorFields,
      };

      return reply.status(400).send(response);
    }
    const statusCode = error.statusCode || 500;
    const response = {
      status: 'Error',
      message: error.message || 'Something went wrong',
      timestamp: new Date().toISOString(),
      errorSource: error.name || 'Internal Server Error',
    };
    return reply.status(statusCode).send(response);
  });

  connectDb();
  config();
};

export default app;
export { app, options, currentUserNameSpace };
