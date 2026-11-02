import test from 'node:test';
import assert from 'node:assert/strict';

import { isSameProduct } from '../src/services/productMatchingService.js';

test('matches same product across stores with same brand and model', () => {
  const a = {
    title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    productId: 'amazon-1',
  };

  const b = {
    title: 'Apple iPhone 15 Pro 128GB',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    productId: 'jumia-1',
  };

  assert.equal(isSameProduct(a, b), true);
});

test('does not match different product variants with same brand', () => {
  const a = {
    title: 'Apple iPhone 15 Pro 128GB',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    productId: 'p-1',
  };

  const b = {
    title: 'Apple iPhone 15 128GB',
    brand: 'Apple',
    model: 'iPhone 15',
    productId: 'p-2',
  };

  assert.equal(isSameProduct(a, b), false);
});
