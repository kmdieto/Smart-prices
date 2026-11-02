import { BaseAdapter } from './baseAdapter.js';

export class JumiaAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'jumia',
      displayName: 'Jumia',
      websiteUrl: 'https://www.jumia.com.ng',
    });
  }

  async search(query = '') {
    const q = String(query || '').trim();

    const fallbackResults = [
      {
        productId: 'jumia-1',
        title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        price: 940,
        currency: 'USD',
        originalPrice: 1049,
        discountPercentage: 11,
        rating: 4.6,
        reviewCount: 9200,
        availability: 'limited',
        condition: 'new',
        seller: 'Jumia Nigeria',
        store: 'Jumia',
        productUrl: 'https://www.jumia.com.ng/iphone-15-pro',
        imageUrl: 'https://images.example.com/jumia-iphone-15-pro.jpg',
        shippingCost: 12,
      },
    ];

    if (!q) {
      return fallbackResults.map((product) => this.normalizeProduct(product));
    }

    const searchTerm = q.toLowerCase();

    return fallbackResults
      .filter((product) => `${product.title} ${product.brand} ${product.model}`.toLowerCase().includes(searchTerm))
      .map((product) => this.normalizeProduct(product));
  }

  async searchByUrl(rawUrl = '') {
    const url = String(rawUrl || '').trim();

    if (!url) {
      return [];
    }

    const product = {
      productId: 'jumia-1',
      title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      price: 940,
      currency: 'USD',
      originalPrice: 1049,
      discountPercentage: 11,
      rating: 4.6,
      reviewCount: 9200,
      availability: 'limited',
      condition: 'new',
      seller: 'Jumia Nigeria',
      store: 'Jumia',
      productUrl: url,
      imageUrl: 'https://images.example.com/jumia-iphone-15-pro.jpg',
      shippingCost: 12,
    };

    return [this.normalizeProduct(product)];
  }
}
