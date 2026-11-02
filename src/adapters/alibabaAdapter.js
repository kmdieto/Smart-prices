import { BaseAdapter } from './baseAdapter.js';

export class AlibabaAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'alibaba',
      displayName: 'Alibaba',
      websiteUrl: 'https://www.alibaba.com',
    });
  }

  async search(query = '') {
    const q = String(query || '').trim();

    const fallbackResults = [
      {
        productId: 'alibaba-1',
        title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        price: 860,
        currency: 'USD',
        originalPrice: 950,
        discountPercentage: 9,
        rating: 4.5,
        reviewCount: 6000,
        availability: 'in_stock',
        condition: 'new',
        seller: 'Alibaba Verified Supplier',
        store: 'Alibaba',
        productUrl: 'https://www.alibaba.com/product-detail/iphone-15-pro.html',
        imageUrl: 'https://images.example.com/alibaba-iphone-15-pro.jpg',
        shippingCost: 20,
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
      productId: 'alibaba-1',
      title: 'Apple iPhone 15 Pro 128GB Natural Titanium',
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      price: 860,
      currency: 'USD',
      originalPrice: 950,
      discountPercentage: 9,
      rating: 4.5,
      reviewCount: 6000,
      availability: 'in_stock',
      condition: 'new',
      seller: 'Alibaba Verified Supplier',
      store: 'Alibaba',
      productUrl: url,
      imageUrl: 'https://images.example.com/alibaba-iphone-15-pro.jpg',
      shippingCost: 20,
    };

    return [this.normalizeProduct(product)];
  }
}
