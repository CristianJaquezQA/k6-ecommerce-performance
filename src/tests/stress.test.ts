import { sleep } from 'k6';
import { Options } from 'k6/options';
import { stressThresholds } from '../config/thresholds.ts';
import { getProducts, getProductById, searchProducts } from '../helpers/http.ts';
import { checkStatus200, checkResponseTime, checkHasBody } from '../helpers/checks.ts';

export const options: Options = {
  stages: [
    { duration: '30s', target: 10  },
    { duration: '30s', target: 20  },
    { duration: '30s', target: 30  },
    { duration: '30s', target: 40  },
    { duration: '1m',  target: 40  },
    { duration: '30s', target: 0   },
  ],
  thresholds: stressThresholds,
};

export default function () {
  const products = getProducts();
  checkStatus200(products);
  checkResponseTime(products, 2000);
  checkHasBody(products);
  sleep(1);

  const product = getProductById(Math.floor(Math.random() * 30) + 1);
  checkStatus200(product);
  checkResponseTime(product, 1500);
  sleep(1);

  const search = searchProducts('phone');
  checkStatus200(search);
  checkResponseTime(search, 1500);
  sleep(1);
}