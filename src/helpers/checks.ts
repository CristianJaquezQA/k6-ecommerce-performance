import { check } from 'k6';
import { RefinedResponse, ResponseType } from 'k6/http';

export function checkStatus200(res: RefinedResponse<ResponseType>): boolean {
  return check(res, {
    'status es 200': (r) => r.status === 200,
  });
}

export function checkResponseTime(
  res: RefinedResponse<ResponseType>,
  maxMs: number
): boolean {
  return check(res, {
    [`response time < ${maxMs}ms`]: (r) => r.timings.duration < maxMs,
  });
}

export function checkHasBody(res: RefinedResponse<ResponseType>): boolean {
  return check(res, {
    'body no está vacío': (r) => (r.body as string).length > 0,
  });
}