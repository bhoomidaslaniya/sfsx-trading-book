import { Request } from "express";

/**
 * Interface for extended request object
 * @export
 * @interface ExtendedRequest
 * @extends {IncomingMessage}
 * @template Body
 */
export interface ExtendedRequest<Body = any> extends Request {
  body: Body;
  params: { [key: string]: any };
  fileNames?: any[];
  user?: any;
  kauth?: any;
}
/**
 * Interface for next function of middlewares
 * @export
 * @interface NextFunctionInterface
 */

/**
 * Interface for extended response object
 * @export
 * @interface ExtendedResponse
 */
export interface ExtendedResponse extends Response {
  /*
   * Add any additional properties you need for your extended response
   * For example:
   */
  data: any;
  statusCode: number;
}
export interface NextFunctionInterface {
  (err?: any): void;

  (deferToNext: "router"): void;
}
