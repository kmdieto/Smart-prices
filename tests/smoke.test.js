import test from 'node:test';
import assert from 'node:assert/strict';

import app from '../src/app.js';

async function withServer(run) {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    await run(port);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test('smoke: health and stores endpoints respond successfully', async () => {
  await withServer(async (port) => {
    const healthResponse = await fetch(`http://127.0.0.1:${port}/api/v1/health`);
    const healthPayload = await healthResponse.json();

    assert.equal(healthResponse.status, 200);
    assert.equal(healthPayload.status, 'ok');

    const storesResponse = await fetch(`http://127.0.0.1:${port}/api/v1/stores`);
    const storesPayload = await storesResponse.json();

    assert.equal(storesResponse.status, 200);
    assert.ok(Array.isArray(storesPayload.data));
    assert.ok(storesPayload.data.length >= 1);
  });
});

test('smoke: search, best-deals, and compare endpoints return valid data', async () => {
  await withServer(async (port) => {
    const searchResponse = await fetch(`http://127.0.0.1:${port}/api/v1/search?q=iphone`);
    const searchPayload = await searchResponse.json();

    assert.equal(searchResponse.status, 200);
    assert.equal(searchPayload.success, true);
    assert.ok(searchPayload.count >= 1);
    assert.ok(Array.isArray(searchPayload.data));

    const bestDealsResponse = await fetch(`http://127.0.0.1:${port}/api/v1/best-deals?q=iphone`);
    const bestDealsPayload = await bestDealsResponse.json();

    assert.equal(bestDealsResponse.status, 200);
    assert.equal(bestDealsPayload.success, true);
    assert.ok(Array.isArray(bestDealsPayload.data));
    assert.ok(bestDealsPayload.data.length >= 1);

    const compareResponse = await fetch(`http://127.0.0.1:${port}/api/v1/compare`, {
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

    const comparePayload = await compareResponse.json();

    assert.equal(compareResponse.status, 200);
    assert.equal(comparePayload.success, true);
    assert.equal(comparePayload.data.bestDeal.store, 'Amazon');
    assert.equal(comparePayload.data.bestDeal.totalCost, 899);
  });
});

test('smoke: URL lookup and review analysis endpoints work', async () => {
  await withServer(async (port) => {
    const lookupResponse = await fetch(`http://127.0.0.1:${port}/api/v1/lookup-url?url=https://www.amazon.com/dp/B0CHX1VWQ5`);
    const lookupPayload = await lookupResponse.json();

    assert.equal(lookupResponse.status, 200);
    assert.equal(lookupPayload.success, true);
    assert.equal(lookupPayload.provider, 'Amazon');
    assert.ok(Array.isArray(lookupPayload.data));
    assert.equal(lookupPayload.data[0].store, 'Amazon');

    const reviewsResponse = await fetch(`http://127.0.0.1:${port}/api/v1/reviews/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviews: [
          'Great phone, excellent battery life',
          'Terrible build quality and poor support',
          'Very satisfied, fast shipping',
        ],
      }),
    });

    const reviewsPayload = await reviewsResponse.json();

    assert.equal(reviewsResponse.status, 200);
    assert.equal(reviewsPayload.success, true);
    assert.equal(reviewsPayload.data.reviewCount, 3);
    assert.ok(reviewsPayload.data.positiveCount >= 1);
  });
});

test('smoke: invalid requests fail with 400', async () => {
  await withServer(async (port) => {
    const invalidCompareResponse = await fetch(`http://127.0.0.1:${port}/api/v1/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: [] }),
    });

    assert.equal(invalidCompareResponse.status, 400);

    const invalidSearchResponse = await fetch(`http://127.0.0.1:${port}/api/v1/search`);
    const invalidSearchPayload = await invalidSearchResponse.json();

    assert.equal(invalidSearchResponse.status, 400);
    assert.equal(invalidSearchPayload.error.status, 400);
  });
});
