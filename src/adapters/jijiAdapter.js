import { BaseAdapter } from './baseAdapter.js';

export class JijiAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'jiji',
      displayName: 'Jiji',
      websiteUrl: 'https://jiji.ng',
    });
  }

  async search(query = '') {
    const q = String(query || '').trim();

    const fallbackResults = [
      {
        productId: 'jiji-1',
        title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        price: 980,
        currency: 'USD',
        originalPrice: 1099,
        discountPercentage: 11,
        rating: 4.4,
        reviewCount: 4100,
        availability: 'available',
        condition: 'used',
        seller: 'Jiji Seller',
        store: 'Jiji',
        productUrl: 'https://jiji.ng/iphone-15-pro',
        imageUrl: 'https://images.example.com/jiji-iphone-15-pro.jpg',
        shippingCost: 0,
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
}
