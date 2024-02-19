import { Response } from 'express'
import { OutgoingHttpHeaders } from 'http'

/**
 * Send success response
 * @export
 * @param {Response} res
 * @param {{ data?: any; message?: string }} body
 * @param {number} [statusCode=200]
 * @param {OutgoingHttpHeaders} [headers={}]
 */
export function sendSuccessResponse<DataResponse>(
  res: Response,
  body: { data?: DataResponse; message?: string },
  statusCode = 200,
  headers: OutgoingHttpHeaders = {},
) {
  res.header(headers)
  res.status(statusCode).json({ isError: false, ...body })
}

/**
 * Send error response
 * @export
 * @param {Response} res
 * @param {{ data?: any; message?: string }} body
 * @param {number} [statusCode=400]
 * @param {OutgoingHttpHeaders} [headers={}]
 */
export function sendErrorResponse<ErrorResponse>(
  res: Response,
  body: { data?: ErrorResponse; message?: string },
  statusCode = 400,
  headers: OutgoingHttpHeaders = {},
) {
  console.log('ERROR: ', body)
  res.header(headers)
  res.status(statusCode)
  res.json({ isError: true, ...body })
}
