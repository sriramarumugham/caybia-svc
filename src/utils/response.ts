const createSuccessResponse = <T>(
  res: FastifyReply,
  message: string,
  data?: T,
  statusCode?: any,
) => {
  return res.status(statusCode ?? 200).send({
    status: 'OK',
    message: message || 'Success',
    timestamp: new Date().toISOString(),
    data: data || null, // Default to null if no data is provided
  });
};

const createErrorResponse = (
  res: FastifyReply,
  message: any,
  statusCode?: any,
) => {
  return res.status(statusCode ?? 500).send({
    status: 'Internal Server Error',
    message: message || 'Error',
    timestamp: new Date(),
    errorSource: 'caybia backend',
  });
};

import { FastifyError, FastifyInstance, FastifyReply } from 'fastify';

const addCustomErrorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler((error: FastifyError, req, res) => {
    if (error.validation) {
      const errors = error.validation.map((v) => ({
        field: v.instancePath,
        message: v.message,
      }));
      return createErrorResponse(res, errors, 400);
    } else {
      const status = 'Internal Server Error';
      const message = error.message || 'Something went wrong';
      return createErrorResponse(res, message, status);
    }
  });
};

export { createSuccessResponse, createErrorResponse, addCustomErrorHandler };
