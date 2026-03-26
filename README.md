# k6 Ecommerce Performance Testing Framework

![smoke](https://github.com/cristian-jaquez/k6-ecommerce-performance/actions/workflows/performance.yml/badge.svg)

Performance testing framework built with k6 and TypeScript targeting a real e-commerce API. Includes load, stress, and spike testing scenarios with threshold-based SLO validation and real-time observability via Grafana + InfluxDB.

---

## Tech stack

- **k6** — performance testing engine
- **TypeScript** — type-safe test scripts
- **InfluxDB** — time-series metrics storage
- **Grafana** — real-time dashboard visualization
- **Docker Compose** — local observability stack
- **GitHub Actions** — automated smoke test on every push

---

## Project structure
```
k6-ecommerce-performance/
├── src/
│   ├── tests/
│   │   ├── smoke.test.ts       # 2 VUs, 10s — baseline verification
│   │   ├── load.test.ts        # up to 10 VUs, 2m — normal traffic
│   │   ├── stress.test.ts      # up to 40 VUs, 3.5m — beyond capacity
│   │   └── spike.test.ts       # up to 50 VUs, spike in 10s
│   ├── config/
│   │   └── thresholds.ts       # SLOs per scenario
│   └── helpers/
│       ├── http.ts             # reusable request helpers
│       └── checks.ts           # reusable response validations
├── .github/workflows/
│   └── performance.yml         # CI pipeline
└── docker-compose.yml          # InfluxDB + Grafana stack
```

---

## Test scenarios

| Scenario | Max VUs | Duration | p95 SLO |
|---|---|---|---|
| Smoke | 2 | 10s | < 500ms |
| Load | 10 | 2m | < 800ms |
| Stress | 40 | 3.5m | < 2000ms |
| Spike | 50 | 2.1m | < 3000ms |

---

## Running the tests

### Prerequisites

- [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Node.js + npm

### Run without observability stack
```bash
npm run smoke
npm run load
npm run stress
npm run spike
```

### Run with Grafana + InfluxDB

Start the observability stack:
```bash
docker-compose up -d
```

Run tests with real-time metrics:
```bash
npm run smoke:influx
npm run load:influx
npm run stress:influx
npm run spike:influx
```

Open Grafana at `http://localhost:3000` to view the dashboard.

---

## Observability stack

The project includes a Docker Compose setup with:

- **InfluxDB 1.8** — receives k6 metrics in real time on port `8086`
- **Grafana** — visualizes metrics on port `3000`

k6 sends metrics to InfluxDB using the `--out` flag:
```bash
k6 run --out influxdb=http://localhost:8086/k6 src/tests/load.test.ts
```

---

## Results summary

Tests executed against [DummyJSON](https://dummyjson.com) — a public e-commerce API.

| Scenario | RPS | avg latency | p95 | p99 | Errors |
|---|---|---|---|---|---|
| Smoke | 1.89/s | 43ms | 46ms | — | 0% |
| Load | 6.99/s | 109ms | 118ms | 1.41s | 0% |
| Stress | 23.13/s | 107ms | 125ms | 1.22s | 0% |
| Spike | 26.19/s | 101ms | 124ms | — | 0% |