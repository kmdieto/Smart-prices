import { groupByMatchedProduct } from './productMatchingService.js';

export function calculateTotalCost(product = {}) {
  const price = Number(product.price ?? 0);
  const shippingCost = Number(product.shippingCost ?? 0);

  if (!Number.isFinite(price)) {
    return null;
  }

  return price + shippingCost;
}

export function compareProductOffers(products = []) {
  const validProducts = products
    .map((product) => ({
      ...product,
      totalCost: calculateTotalCost(product),
    }))
    .filter((product) => product.price !== null && product.price !== undefined);

  const groupedOffers = groupByMatchedProduct(validProducts);

  const allOffers = groupedOffers.flatMap((group) => group.offers);

  const lowestPrice = [...allOffers].sort(
    (a, b) => (Number(a.price) ?? Number.MAX_SAFE_INTEGER) - (Number(b.price) ?? Number.MAX_SAFE_INTEGER),
  )[0] ?? null;

  const highestRated = [...allOffers]
    .filter((product) => product.rating !== null && product.rating !== undefined)
    .sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0))[0] ?? null;

  const bestDeal = [...allOffers]
    .filter((product) => product.totalCost !== null)
    .sort((a, b) => Number(a.totalCost) - Number(b.totalCost))[0] ?? null;

  return {
    productCount: allOffers.length,
    groupCount: groupedOffers.length,
    groups: groupedOffers,
    lowestPrice,
    highestRated,
    bestDeal,
    offers: allOffers,
  };
}
