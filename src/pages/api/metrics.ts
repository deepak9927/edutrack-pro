import { NextApiRequest, NextApiResponse } from 'next';
import { register, Counter } from 'prom-client';

const httpRequestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Increment the HTTP request counter
    httpRequestCounter.inc({
      method: req.method,
      path: req.url,
      status: res.statusCode,
    });

    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    console.error("Error serving metrics", error);
    res.status(500).end(error);
  }
}