import { MockAdapter } from '../adapters/mockAdapter.js';
import { AmazonAdapter } from '../adapters/amazonAdapter.js';
import { EbayAdapter } from '../adapters/ebayAdapter.js';
import { JumiaAdapter } from '../adapters/jumiaAdapter.js';
import { JijiAdapter } from '../adapters/jijiAdapter.js';
import { KilimallAdapter } from '../adapters/kilimallAdapter.js';
import { AlibabaAdapter } from '../adapters/alibabaAdapter.js';
import { AliExpressAdapter } from '../adapters/aliexpressAdapter.js';

const adapters = [
  new MockAdapter(),
  new AmazonAdapter(),
  new EbayAdapter(),
  new JumiaAdapter(),
  new JijiAdapter(),
  new KilimallAdapter(),
  new AlibabaAdapter(),
  new AliExpressAdapter(),
];

const adapterLookup = new Map(
  adapters.map((adapter) => [adapter.name, adapter]),
);

export function getSupportedStores() {
  return adapters.map((adapter) => ({
    name: adapter.name,
    displayName: adapter.displayName,
    websiteUrl: adapter.websiteUrl,
    status: adapter.name === 'mock' ? 'mocked' : 'adapter_registered',
    note:
      adapter.name === 'mock'
        ? 'This is a placeholder adapter for foundation validation and architecture testing.'
        : 'This adapter is registered and ready for official marketplace integration when credentials and permissions are available.',
  }));
}

export function detectMarketplaceByUrl(rawUrl = '') {
  const value = String(rawUrl || '').trim();

  if (!value) {
    return null;
  }

  try {
    const { hostname } = new URL(value);
    const normalizedHost = hostname.replace(/^www\./, '').toLowerCase();

    const match = Object.entries({
      amazon: ['amazon.com'],
      ebay: ['ebay.com'],
      jumia: ['jumia.com.ng'],
      jiji: ['jiji.ng'],
      kilimall: ['kilimall.co.ke'],
      alibaba: ['alibaba.com'],
      aliexpress: ['aliexpress.com'],
    }).find(([, hosts]) => hosts.includes(normalizedHost));

    return match ? adapterLookup.get(match[0]) : null;
  } catch {
    return null;
  }
}

export async function searchByUrl(rawUrl = '') {
  const adapter = detectMarketplaceByUrl(rawUrl);

  if (!adapter) {
    throw new Error('Unsupported marketplace URL. Only supported storefront domains are accepted.');
  }

  return adapter.searchByUrl(rawUrl);
}

export async function searchAcrossStores(query = '') {
  const searchTerm = String(query || '').trim();

  if (!searchTerm) {
    throw new Error('Query parameter "q" is required.');
  }

  const results = [];

  for (const adapter of adapters) {
    const items = await adapter.search(searchTerm);
    results.push(...items);
  }

  return results;
}
