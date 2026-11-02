import { groupByMatchedProduct } from './productMatchingService.js';

export function buildBestDealGroups(offers = []) {
  const grouped = groupByMatchedProduct(offers);

  return grouped.map((group) => {
    const bestOffer = [...group.offers].sort((a, b) => {
      const aTotal = Number(a.price ?? Number.MAX_SAFE_INTEGER) + Number(a.shippingCost ?? 0);
      const bTotal = Number(b.price ?? Number.MAX_SAFE_INTEGER) + Number(b.shippingCost ?? 0);
      return aTotal - bTotal;
    })[0];

    const highestRated = [...group.offers]
      .filter((offer) => Number.isFinite(Number(offer.rating)))
      .sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0))[0] || null;

    return {
      productKey: group.productKey,
      offerCount: group.offers.length,
      bestOffer,
      highestRated,
      offers: group.offers,
    };
  });
}
