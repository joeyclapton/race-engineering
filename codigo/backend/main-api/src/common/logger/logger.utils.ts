import {
  getCustomerEmailFromToken,
  getCustomerIdFromToken,
} from '../utils/decode.utils';
import { Request, Response } from 'express';

interface RequestLogFields {
  method: string;
  agent: string;
  url: string;
  headers: string;
  query: string;
  body: string;
}

interface UserLogFields {
  id: number;
  email: string;
}

interface ResponseLogFields {
  code: number;
  body: string;
  headers: string;
  time: string;
}

export interface LogContent {
  logMessage: string;
  request: RequestLogFields;
  user: UserLogFields;
  response: ResponseLogFields;
}

export function buildLogContent(
  request: Request,
  response: Response,
  errorMessage?: any,
): LogContent {
  // USER
  const token = request.headers.authorization;
  let userId = 0;
  let userEmailToken = '';
  userId = getCustomerIdFromToken(token);
  userEmailToken = getCustomerEmailFromToken(token);
  const userEmail = userEmailToken || request.body.email;
  const user: UserLogFields = {
    id: userId,
    email: userEmail,
  };

  // REQUEST
  const { method, originalUrl, query, headers } = request;
  const userAgent = request.get('user-agent') || '';
  if (request.body.password) delete request.body.password;
  const requestFields: RequestLogFields = {
    method: method,
    agent: userAgent,
    url: originalUrl,
    headers: JSON.stringify(headers),
    query: JSON.stringify(query),
    body: JSON.stringify(request.body),
  };

  // RESPONSE
  const reqTimeHeader = request.headers['x-request-time'];
  const requestTime = Array.isArray(reqTimeHeader)
    ? reqTimeHeader[0]
    : reqTimeHeader;
  const startTime = new Date(parseInt(requestTime)).getTime();
  const endTime = Date.now();
  const timeDuration = (endTime - startTime) / 1000;
  const { statusCode } = response;
  const responseHeaders = JSON.stringify(response.getHeaders());
  const responseBody = JSON.stringify(CompleteResponse.body);
  const responseFields: ResponseLogFields = {
    code: statusCode,
    body: responseBody,
    headers: responseHeaders,
    time: `${timeDuration}s`,
  };

  // LOG MESSAGE
  const logMessage = `${method} ${statusCode} ${originalUrl} | query: ${JSON.stringify(
    query,
  )} ${
    errorMessage ? JSON.stringify(errorMessage) : ''
  } | time: ${timeDuration}ms | user { id: ${userId}, email: ${userEmail} } | response: ${responseBody}`;

  return {
    user: user,
    request: requestFields,
    response: responseFields,
    logMessage: logMessage,
  };
}

class CompleteResponse {
  static body: any;
}

export const getResponseBody = (res: Response) => {
  const rawResponseEnd = res.end;
  const chunkBuffers = [];

  res.end = (...chunk) => {
    const resArgs = [];
    for (let i = 0; i < chunk.length; i++) {
      resArgs[i] = chunk[i];
    }
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }
    const body = Buffer.concat(chunkBuffers).toString('utf8');
    CompleteResponse.body = body ? JSON.parse(body) : {};

    rawResponseEnd.apply(res, resArgs);
    return body as unknown as Response;
  };
};
