import { sleep } from 'k6';
import { Options } from 'k6/options';
import { loadThresholds } from '../config/thresholds.ts';
import { getProducts, getProductById, searchProducts } from '../helpers/http.ts';
import { checkStatus200, checkResponseTime, checkHasBody } from '../helpers/checks.ts';

export const options: Options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m',  target: 10 },
    { duration: '30s', target: 0  },
  ],
  thresholds: loadThresholds,
};

export default function () {
  const products = getProducts();
  checkStatus200(products);
  checkResponseTime(products, 800);
  checkHasBody(products);
  sleep(1);

  const product = getProductById(Math.floor(Math.random() * 30) + 1);
  checkStatus200(product);
  checkResponseTime(product, 500);
  sleep(1);

  const search = searchProducts('laptop');
  checkStatus200(search);
  checkResponseTime(search, 600);
  sleep(1);
}