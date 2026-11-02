import test from 'node:test';
import assert from 'node:assert/strict';

import app from '../src/app.js';

test('GET /api/v1/health responds with app status', async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/health`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.status, 'ok');
  } finally {
    server.close();
  }
});

test('POST /api/v1/compare resolves the lowest total-cost offer', async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        products: [
          { title: 'Apple iPhone 15 Pro', price: 940, shippingCost: 12, store: 'Jumia' },
          { title: 'Apple iPhone 15 Pro', price: 899, shippingCost: 0, store: 'Amazon' },
          { title: 'Apple iPhone 15 Pro', price: 1019, shippingCost: 18, store: 'eBay' },
        ],
      }),
    });

    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.data.bestDeal.store, 'Amazon');
    assert.equal(payload.data.bestDeal.totalCost, 899);
  } finally {
    server.close();
  }
});

test('GET /api/v1/search accepts a supported product URL and resolves the Amazon adapter', async () => {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/search?url=https://www.amazon.com/dp/B0CHX1VWQ5`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.data[0].store, 'Amazon');
    assert.equal(payload.data[0].productUrl, 'https://www.amazon.com/dp/B0CHX1VWQ5');
  } finally {
    server.close();
  }
});

