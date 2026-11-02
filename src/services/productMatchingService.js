export function normalizeProductToken(value = '') {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function calculateNameSimilarity(a = '', b = '') {
  const left = normalizeProductToken(a);
  const right = normalizeProductToken(b);

  if (!left || !right) {
    return 0;
  }

  const leftTokens = new Set(left.split(' '));
  const rightTokens = new Set(right.split(' '));
  const overlap = [...leftTokens].filter((token) => rightTokens.has(token));

  const denominator = Math.max(leftTokens.size, rightTokens.size, 1);
  return Number(((overlap.length / denominator) * 100).toFixed(2));
}

export function isSameProduct(productA = {}, productB = {}) {
  const nameScore = calculateNameSimilarity(productA.title || '', productB.title || '');
  const brandMatch = normalizeProductToken(productA.brand || '') === normalizeProductToken(productB.brand || '');
  const modelA = normalizeProductToken(productA.model || '');
  const modelB = normalizeProductToken(productB.model || '');
  const modelMatch = modelA && modelB ? modelA === modelB : !modelA && !modelB;
  const skuMatch = normalizeProductToken(productA.productId || '') === normalizeProductToken(productB.productId || '');

  if (skuMatch && (productA.productId || productB.productId)) {
    return true;
  }

  if (modelA && modelB && !modelMatch) {
    return false;
  }

  if (brandMatch && modelMatch && nameScore >= 60) {
    return true;
  }

  if (brandMatch && !modelA && !modelB && nameScore >= 80) {
    return true;
  }

  return false;
}

export function groupByMatchedProduct(offers = []) {
  const groups = [];

  for (const offer of offers) {
    let matchedGroup = null;

    for (const group of groups) {
      const isMatch = group.offers.some((existing) => isSameProduct(existing, offer));
      if (isMatch) {
        matchedGroup = group;
        break;
      }
    }

    if (!matchedGroup) {
      groups.push({
        productKey: `${offer.brand || 'unknown'}:${offer.model || offer.title || 'unknown'}`,
        offers: [offer],
      });
      continue;
    }

    matchedGroup.offers.push(offer);
  }

  return groups.map((group) => {
    const bestOffer = [...group.offers].sort((a, b) => {
      const aTotal = Number(a.price ?? Number.MAX_SAFE_INTEGER) + Number(a.shippingCost ?? 0);
      const bTotal = Number(b.price ?? Number.MAX_SAFE_INTEGER) + Number(b.shippingCost ?? 0);
      return aTotal - bTotal;
    })[0];

    return {
      ...group,
      bestOffer,
    };
  });
}
