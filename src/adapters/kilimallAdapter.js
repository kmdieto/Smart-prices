import { BaseAdapter } from './baseAdapter.js';

export class KilimallAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'kilimall',
      displayName: 'Kilimall',
      websiteUrl: 'https://www.kilimall.co.ke',
    });
  }

  async search(query = '') {
    const q = String(query || '').trim();

    const fallbackResults = [
      {
        productId: 'kilimall-1',
        title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        price: 990,
        currency: 'USD',
        originalPrice: 1099,
        discountPercentage: 10,
        rating: 4.5,
        reviewCount: 3200,
        availability: 'in_stock',
        condition: 'new',
        seller: 'Kilimall Mobile',
        store: 'Kilimall',
        productUrl: 'https://www.kilimall.co.ke/iphone-15-pro',
        imageUrl: 'https://images.example.com/kilimall-iphone-15-pro.jpg',
        shippingCost: 15,
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
