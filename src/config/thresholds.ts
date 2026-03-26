export const smokeThresholds = {
  http_req_duration: ['p(95)<3000'],
  http_req_failed:   ['rate<0.01'],
};

export const loadThresholds = {
  http_req_duration: ['p(95)<800', 'p(99)<1500'],
  http_req_failed:   ['rate<0.01'],
};

export const stressThresholds = {
  http_req_duration: ['p(95)<2000', 'p(99)<3000'],
  http_req_failed:   ['rate<0.05'],
};

export const spikeThresholds = {
  http_req_duration: ['p(95)<3000'],
  http_req_failed:   ['rate<0.10'],
};