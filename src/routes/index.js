import { Router } from 'express';
import {
  analyzeReviews,
  bestPrice,
  bestRated,
  compareProducts,
  groupedBestDeals,
  healthCheck,
  listStores,
  lookupProductByUrl,
  searchMarketplaceResults,
} from '../controllers/apiController.js';
import { validateComparePayload, validateSearchQuery } from '../validators/marketplaceValidator.js';

const router = Router();

/**
 * @openapi
 * /api/v1/health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is working normally
 */
router.get('/health', healthCheck);

/**
 * @openapi
 * /api/v1/stores:
 *   get:
 *     summary: List supported marketplaces
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: Supported marketplace adapters
 */
router.get('/stores', listStores);

/**
 * @openapi
 * /api/v1/search:
 *   get:
 *     summary: Search marketplaces by keyword or supported product URL
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Product name or keyword
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         description: Product URL from a supported marketplace
 *     responses:
 *       200:
 *         description: Search results from supported marketplaces
 */
router.get('/search', validateSearchQuery, searchMarketplaceResults);

/**
 * @openapi
 * /api/v1/lookup-url:
 *   get:
 *     summary: Resolve a product URL from a supported marketplace
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Normalized product result for the given product URL
 */
router.get('/lookup-url', validateSearchQuery, lookupProductByUrl);

/**
 * @openapi
 * /api/v1/compare:
 *   post:
 *     summary: Compare offers across stores
 *     tags: [Comparison]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [products]
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *               stores:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Comparison including grouped best deals
 */
router.post('/compare', validateComparePayload, compareProducts);

/**
 * @openapi
 * /api/v1/best-price:
 *   get:
 *     summary: Return the cheapest product offer
 *     tags: [Comparison]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lowest-priced product offer
 */
router.get('/best-price', bestPrice);

/**
 * @openapi
 * /api/v1/best-deals:
 *   get:
 *     summary: Return grouped product deals by matching family
 *     tags: [Comparison]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product groups with the best offer for each matched product family
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 query:
 *                   type: string
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productKey:
 *                         type: string
 *                       offerCount:
 *                         type: integer
 *                       bestOffer:
 *                         type: object
 *                       highestRated:
 *                         type: object
 *                       offers:
 *                         type: array
 *                         items:
 *                           type: object
 */
router.get('/best-deals', groupedBestDeals);

/**
 * @openapi
 * /api/v1/best-rated:
 *   get:
 *     summary: Return the highest-rated offer
 *     tags: [Comparison]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Best-rated product offer
 */
router.get('/best-rated', bestRated);

/**
 * @openapi
 * /api/v1/reviews/analyze:
 *   post:
 *     summary: Analyze review sentiment
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviews:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Positive and negative review analysis summary
 */
router.post('/reviews/analyze', analyzeReviews);

export default router;
