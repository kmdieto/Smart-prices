import test from 'node:test';
import assert from 'node:assert/strict';

import { groupByMatchedProduct } from '../src/services/productMatchingService.js';

const offers = [
  {
    title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    price: 899,
    shippingCost: 0,
    store: 'Amazon',
  },
  {
    title: 'Apple iPhone 15 Pro 128GB',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    price: 940,
    shippingCost: 12,
    store: 'Jumia',
  },
  {
    title: 'Apple iPhone 15 128GB',
    brand: 'Apple',
    model: 'iPhone 15',
    price: 780,
    shippingCost: 10,
    store: 'AliExpress',
  },
];

test('groups matched offers by product and keeps different variants separate', () => {
  const groups = groupByMatchedProduct(offers);

  assert.equal(groups.length, 2);
  assert.equal(groups[0].offers.length, 2);
  assert.equal(groups[1].offers.length, 1);
  assert.equal(groups[0].bestOffer.store, 'Amazon');
  assert.equal(groups[1].bestOffer.store, 'AliExpress');
});
