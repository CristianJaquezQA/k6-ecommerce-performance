import { sleep } from 'k6';
import { Options } from 'k6/options';
import { smokeThresholds } from '../config/thresholds.ts';
import { getProducts } from '../helpers/http.ts';
import { checkStatus200, checkResponseTime, checkHasBody } from '../helpers/checks.ts';
export const options: Options = {
  vus: 2,
  duration: '10s',
  thresholds: smokeThresholds,
};

export default function () {
  const res = getProducts();

  checkStatus200(res);
  checkResponseTime(res, 500);
  checkHasBody(res);

  sleep(1);
}