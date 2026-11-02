import { BaseAdapter } from './baseAdapter.js';

export class AmazonAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'amazon',
      displayName: 'Amazon',
      websiteUrl: 'https://www.amazon.com',
    });
  }

  async search(query = '') {
    const q = String(query || '').trim();

    const fallbackResults = [
      {
        productId: 'amazon-1',
        title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        price: 899,
        currency: 'USD',
        originalPrice: 999,
        discountPercentage: 10,
        rating: 4.8,
        reviewCount: 12800,
        availability: 'in_stock',
        condition: 'new',
        seller: 'Amazon.com',
        store: 'Amazon',
        productUrl: 'https://www.amazon.com/dp/B0CHX1VWQ5',
        imageUrl: 'https://images.example.com/amazon-iphone-15-pro.jpg',
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

  async searchByUrl(rawUrl = '') {
    const url = String(rawUrl || '').trim();

    if (!url) {
      return [];
    }

    const product = {
      productId: 'amazon-1',
      title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      price: 899,
      currency: 'USD',
      originalPrice: 999,
      discountPercentage: 10,
      rating: 4.8,
      reviewCount: 12800,
      availability: 'in_stock',
      condition: 'new',
      seller: 'Amazon.com',
      store: 'Amazon',
      productUrl: url,
      imageUrl: 'https://images.example.com/amazon-iphone-15-pro.jpg',
      shippingCost: 0,
    };

    return [this.normalizeProduct(product)];
  }
}
