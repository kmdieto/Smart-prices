export class BaseAdapter {
  constructor({ name, displayName, websiteUrl }) {
    this.name = name;
    this.displayName = displayName;
    this.websiteUrl = websiteUrl;
  }

  async search() {
    throw new Error(`${this.name} adapter must implement search(query)`);
  }

  async searchByUrl(rawUrl = '') {
    const url = String(rawUrl || '').trim();

    if (!url) {
      return [];
    }

    return this.search(url);
  }

  normalizeProduct(rawProduct = {}) {
    return {
      productId: rawProduct.productId ?? null,
      title: rawProduct.title ?? '',
      brand: rawProduct.brand ?? null,
      model: rawProduct.model ?? null,
      price: rawProduct.price ?? null,
      currency: rawProduct.currency ?? null,
      originalPrice: rawProduct.originalPrice ?? null,
      discountPercentage: rawProduct.discountPercentage ?? null,
      rating: rawProduct.rating ?? null,
      reviewCount: rawProduct.reviewCount ?? null,
      availability: rawProduct.availability ?? null,
      condition: rawProduct.condition ?? null,
      seller: rawProduct.seller ?? null,
      store: rawProduct.store ?? this.displayName,
      productUrl: rawProduct.productUrl ?? '',
      imageUrl: rawProduct.imageUrl ?? null,
      shippingCost: rawProduct.shippingCost ?? null,
      lastUpdated: rawProduct.lastUpdated ?? new Date().toISOString(),
    };
  }
}
