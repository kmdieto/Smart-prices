import { BaseAdapter } from './baseAdapter.js';

export class MockAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'mock',
      displayName: 'Mock Marketplace',
      websiteUrl: 'https://example.com',
    });
  }

  async search(query = '') {
    const searchTerm = String(query).trim().toLowerCase();

    const catalog = [
      {
        productId: 'mock-1',
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
        seller: 'SmartPrice Outlet',
        store: 'Amazon',
        productUrl: 'https://example.com/amazon/iphone-15-pro',
        imageUrl: 'https://images.example.com/iphone-15-pro.jpg',
        shippingCost: 0,
      },
      {
        productId: 'mock-2',
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
        seller: 'FastDeal',
        store: 'Jumia',
        productUrl: 'https://example.com/jumia/iphone-15-pro',
        imageUrl: 'https://images.example.com/jumia-iphone-15-pro.jpg',
        shippingCost: 12,
      },
      {
        productId: 'mock-3',
        title: 'Samsung Galaxy S24 Ultra 256GB Titanium Gray',
        brand: 'Samsung',
        model: 'Galaxy S24 Ultra',
        price: 1019,
        currency: 'USD',
        originalPrice: 1199,
        discountPercentage: 15,
        rating: 4.7,
        reviewCount: 7400,
        availability: 'in_stock',
        condition: 'new',
        seller: 'PixelTrade',
        store: 'eBay',
        productUrl: 'https://example.com/ebay/galaxy-s24-ultra',
        imageUrl: 'https://images.example.com/galaxy-s24-ultra.jpg',
        shippingCost: 18,
      },
    ];

    if (!searchTerm) {
      return catalog.map((product) => this.normalizeProduct(product));
    }

    return catalog
      .filter((product) => {
        const text = `${product.title} ${product.brand} ${product.model}`.toLowerCase();
        return text.includes(searchTerm);
      })
      .map((product) => this.normalizeProduct(product));
  }
}
