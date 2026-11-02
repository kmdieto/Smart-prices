import { getSupportedStores, searchAcrossStores, searchByUrl } from '../services/storeRegistry.js';
import { compareProductOffers } from '../services/priceComparisonService.js';
import { buildBestDealGroups } from '../services/dealGroupingService.js';

export async function healthCheck(req, res) {
  res.status(200).json({
    success: true,
    status: 'ok',
    message: 'SmartPrice API is running.',
    timestamp: new Date().toISOString(),
  });
}

export async function listStores(req, res) {
  const stores = getSupportedStores();

  res.status(200).json({
    success: true,
    count: stores.length,
    data: stores,
  });
}

export async function searchMarketplaceResults(req, res, next) {
  try {
    const query = req.query.q || '';
    const productUrl = req.query.url || '';
    const results = productUrl ? await searchByUrl(productUrl) : await searchAcrossStores(query);

    res.status(200).json({
      success: true,
      query: productUrl || query,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
}

export async function lookupProductByUrl(req, res, next) {
  try {
    const productUrl = req.query.url || '';
    const results = productUrl ? await searchByUrl(productUrl) : [];

    res.status(200).json({
      success: true,
      query: productUrl,
      count: results.length,
      provider: results[0]?.store || null,
      data: results,
    });
  } catch (error) {
    next(error);
  }
}

export async function compareProducts(req, res, next) {
  try {
    const { products, stores } = req.body || {};

    const normalizedProducts = Array.isArray(products) ? products : [];
    const selectedStores = Array.isArray(stores) ? stores : [];
    const comparison = compareProductOffers(normalizedProducts);

    res.status(200).json({
      success: true,
      data: {
        selectedStores,
        products: normalizedProducts,
        groups: comparison.groups,
        bestDeal: comparison.bestDeal,
        lowestPrice: comparison.lowestPrice,
        highestRated: comparison.highestRated,
        summary: {
          productCount: comparison.productCount,
          groupCount: comparison.groupCount,
          availableStores: selectedStores.length || 'all',
          bestDealStore: comparison.bestDeal?.store || null,
          bestDealTotalCost: comparison.bestDeal?.totalCost ?? null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function bestPrice(req, res, next) {
  try {
    const query = String(req.query.q || '').trim();
    const results = query ? await searchAcrossStores(query) : [];

    const best = results
      .filter((product) => product.price !== null)
      .sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER))[0] || null;

    res.status(200).json({
      success: true,
      query,
      data: best,
    });
  } catch (error) {
    next(error);
  }
}

export async function groupedBestDeals(req, res, next) {
  try {
    const query = String(req.query.q || '').trim();
    const results = query ? await searchAcrossStores(query) : [];
    const groups = buildBestDealGroups(results);

    res.status(200).json({
      success: true,
      query,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    next(error);
  }
}

export async function bestRated(req, res, next) {
  try {
    const query = String(req.query.q || '').trim();
    const results = query ? await searchAcrossStores(query) : [];

    const best = results
      .filter((product) => product.rating !== null)
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))[0] || null;

    res.status(200).json({
      success: true,
      query,
      data: best,
    });
  } catch (error) {
    next(error);
  }
}

export async function analyzeReviews(req, res, next) {
  try {
    const reviews = Array.isArray(req.body?.reviews) ? req.body.reviews : [];

    const positiveKeywords = ['good', 'great', 'excellent', 'love', 'fast', 'reliable', 'satisfied'];
    const negativeKeywords = ['slow', 'bad', 'broken', 'late', 'poor', 'cheap', 'late delivery'];

    const positiveCount = reviews.filter((review) => {
      const text = String(review || '').toLowerCase();
      return positiveKeywords.some((keyword) => text.includes(keyword));
    }).length;

    const negativeCount = reviews.filter((review) => {
      const text = String(review || '').toLowerCase();
      return negativeKeywords.some((keyword) => text.includes(keyword));
    }).length;

    const sentimentScore = reviews.length ? ((positiveCount - negativeCount) / reviews.length) * 100 : 0;

    res.status(200).json({
      success: true,
      data: {
        reviewCount: reviews.length,
        positiveCount,
        negativeCount,
        sentimentScore: Number(sentimentScore.toFixed(2)),
        summary: reviews.length
          ? sentimentScore >= 0
            ? 'Overall sentiment is positive.'
            : 'Overall sentiment is negative.'
          : 'No review data was provided for analysis.',
      },
    });
  } catch (error) {
    next(error);
  }
}
