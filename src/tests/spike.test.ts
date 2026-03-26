import { sleep } from 'k6';
import { Options } from 'k6/options';
import { spikeThresholds } from '../config/thresholds.ts';
import { getProducts, getProductById, searchProducts } from '../helpers/http.ts';
import { checkStatus200, checkResponseTime, checkHasBody } from '../helpers/checks.ts';

export const options: Options = {
  stages: [
    { duration: '10s', target: 5   },
    { duration: '10s', target: 50  },
    { duration: '1m',  target: 50  },
    { duration: '10s', target: 5   },
    { duration: '30s', target: 5   },
    { duration: '10s', target: 0   },
  ],
  thresholds: spikeThresholds,
};

export default function () {
  const products = getProducts();
  checkStatus200(products);
  checkResponseTime(products, 3000);
  checkHasBody(products);
  sleep(1);

  const product = getProductById(Math.floor(Math.random() * 30) + 1);
  checkStatus200(product);
  checkResponseTime(product, 3000);
  sleep(1);

  const search = searchProducts('phone');
  checkStatus200(search);
  checkResponseTime(search, 3000);
  sleep(1);
}