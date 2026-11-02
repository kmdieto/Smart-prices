import { BaseAdapter } from './baseAdapter.js';
import { env } from '../config/env.js';

export class EbayAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'ebay',
      displayName: 'eBay',
      websiteUrl: 'https://www.ebay.com',
    });
  }

  async search(query = '') {
    const q = String(query || '').trim();

    if (!env.EBAY_APP_ID) {
      return this._fallbackResults(q);
    }

    return this._fallbackResults(q);
  }

  _fallbackResults(query = '') {
    const fallbackSearch = [
      {
        productId: 'ebay-1',
        title: 'Apple iPhone 15 Pro 128GB Titanium',
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        price: 934,
        currency: 'USD',
        originalPrice: 1049,
        discountPercentage: 11,
        rating: 4.7,
        reviewCount: 3500,
        availability: 'in_stock',
        condition: 'new',
        seller: 'eBay Verified Seller',
        store: 'eBay',
        productUrl: 'https://www.ebay.com/iphone-15-pro',
        imageUrl: 'https://images.example.com/ebay-iphone-15-pro.jpg',
        shippingCost: 8,
      },
    ];

    if (!query) {
      return fallbackSearch.map((item) => this.normalizeProduct(item));
    }

    const searchTerm = query.toLowerCase();

    return fallbackSearch
      .filter((item) => {
        const haystack = `${item.title} ${item.brand} ${item.model}`.toLowerCase();
        return haystack.includes(searchTerm);
      })
      .map((item) => this.normalizeProduct(item));
  }

  async searchByUrl(rawUrl = '') {
    const url = String(rawUrl || '').trim();

    if (!url) {
      return [];
    }

    const product = {
      productId: 'ebay-1',
      title: 'Apple iPhone 15 Pro 128GB Titanium',
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      price: 934,
      currency: 'USD',
      originalPrice: 1049,
      discountPercentage: 11,
      rating: 4.7,
      reviewCount: 3500,
      availability: 'in_stock',
      condition: 'new',
      seller: 'eBay Verified Seller',
      store: 'eBay',
      productUrl: url,
      imageUrl: 'https://images.example.com/ebay-iphone-15-pro.jpg',
      shippingCost: 8,
    };

    return [this.normalizeProduct(product)];
  }
}
