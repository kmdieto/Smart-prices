import { BaseAdapter } from './baseAdapter.js';

export class AliExpressAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'aliexpress',
      displayName: 'AliExpress',
      websiteUrl: 'https://www.aliexpress.com',
    });
  }

  async search(query = '') {
    const q = String(query || '').trim();

    const fallbackResults = [
      {
        productId: 'aliexpress-1',
        title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        price: 820,
        currency: 'USD',
        originalPrice: 900,
        discountPercentage: 9,
        rating: 4.4,
        reviewCount: 8100,
        availability: 'in_stock',
        condition: 'new',
        seller: 'AliExpress Seller',
        store: 'AliExpress',
        productUrl: 'https://www.aliexpress.com/item/iphone-15-pro.html',
        imageUrl: 'https://images.example.com/aliexpress-iphone-15-pro.jpg',
        shippingCost: 18,
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
      productId: 'aliexpress-1',
      title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      price: 820,
      currency: 'USD',
      originalPrice: 900,
      discountPercentage: 9,
      rating: 4.4,
      reviewCount: 8100,
      availability: 'in_stock',
      condition: 'new',
      seller: 'AliExpress Seller',
      store: 'AliExpress',
      productUrl: url,
      imageUrl: 'https://images.example.com/aliexpress-iphone-15-pro.jpg',
      shippingCost: 18,
    };

    return [this.normalizeProduct(product)];
  }
}
