import { Schema } from "joi";
import { ServerResponse } from "http";

import {
  ExtendedRequest,
  NextFunctionInterface,
} from "../interfaces/server.interface";

/**
 * Bind joi schema with joi validator middleware to validate request object
 * @export
 * @param {Schema} schema
 * @returns Middleware function
 */
export function joiValidatorMiddleware(schema: Schema) {
  return _joiValidator.bind({ schema });
}

/**
 * Middleware for validating joi schema
 * @param {ExtendedRequest} req
 * @param {ServerResponse} res
 * @param {NextFunctionInterface} next
 */
async function _joiValidator(
  this: any,
  req: ExtendedRequest,
  res: ServerResponse,
  next: NextFunctionInterface
) {
  try {
    const schema: Schema = this.schema;

    await schema.validateAsync(req);
    next();
  } catch (error) {
    next(error);
  }
}
