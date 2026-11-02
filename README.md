# SmartPrice API

SmartPrice API is a modular Node.js and Express backend for product discovery, price comparison, and review intelligence. The project is designed to support multiple storefront adapters and to grow into a RapidAPI-ready service.

## Stack

- Node.js
- Express.js
- JavaScript ES modules
- Axios
- Cheerio
- Swagger UI / Swagger JSDoc
- PostgreSQL-ready architecture for a later phase
- Gemini-ready review analysis layer for a later phase

## Supported marketplace adapters

The project is organized around independent adapters for:

- Amazon
- eBay
- Jumia
- Jiji
- Kilimall
- Alibaba
- AliExpress

These are registered as adapter modules, but they remain intentionally safe and permission-aware rather than assuming unrestricted scraping is allowed.

## Project structure

```bash
smartprice-api/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── env.js
│   │   └── swagger.js
│   ├── routes/
│   │   └── index.js
│   ├── controllers/
│   │   └── apiController.js
│   ├── services/
│   │   ├── productSearchService.js
│   │   ├── priceComparisonService.js
│   │   └── storeRegistry.js
│   ├── adapters/
│   │   ├── baseAdapter.js
│   │   ├── ebayAdapter.js
│   │   ├── mockAdapter.js
│   │   └── amazonAdapter.js (planned)
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── validators/
│   │   └── marketplaceValidator.js
│   └── utils/
├── tests/
│   └── api.test.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── package-lock.json
```

## Setup

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Copy the environment file:

```bash
copy .env.example .env
```

3. Start the app in development mode:

```bash
npm run dev
```

4. Or run the production-style start command:

```bash
npm start
```

## API endpoints

- GET /api/v1/health
- GET /api/v1/stores
- GET /api/v1/search?q=iphone
- POST /api/v1/compare
- GET /api/v1/best-price?q=iphone
- GET /api/v1/best-rated?q=iphone
- POST /api/v1/reviews/analyze
- Swagger docs: /api-docs

The compare endpoint now calculates the lowest delivery-adjusted offer using the total cost formula:

```text
price + shippingCost
```

This gives a real best-deal result before the marketplace integrations are fully live.

## Example requests

```bash
curl http://localhost:3000/api/v1/health
curl "http://localhost:3000/api/v1/search?q=iphone"
curl "http://localhost:3000/api/v1/best-price?q=iphone"
curl "http://localhost:3000/api/v1/best-deals?q=iphone"
curl "http://localhost:3000/api/v1/search?url=https://www.amazon.com/dp/B0CHX1VWQ5"
```

## RapidAPI-style response example

```json
{
  "success": true,
  "query": "iphone",
  "count": 1,
  "data": [
    {
      "productKey": "Apple:iPhone 15 Pro",
      "offerCount": 3,
      "bestOffer": {
        "title": "Apple iPhone 15 Pro 128GB Natural Titanium",
        "brand": "Apple",
        "model": "iPhone 15 Pro",
        "price": 899,
        "shippingCost": 0,
        "store": "Amazon",
        "productUrl": "https://www.amazon.com/dp/B0CHX1VWQ5"
      },
      "highestRated": {
        "store": "Amazon",
        "rating": 4.8
      },
      "offers": [
        {
          "title": "Apple iPhone 15 Pro 128GB Natural Titanium",
          "brand": "Apple",
          "model": "iPhone 15 Pro",
          "price": 899,
          "shippingCost": 0,
          "store": "Amazon"
        }
      ]
    }
  ]
}
```

## Notes on marketplace access

The project is intentionally structured so each store can be implemented as an independent adapter. For each platform, the recommended approach is to use official APIs, partner feeds, or other permitted access channels before considering scraping. This avoids legal or policy issues and keeps the design production-safe.

## Planned next steps

- Validate which marketplaces support official APIs or authorized feeds
- Add real adapters for Amazon, eBay, Jumia, Jiji, and Kilimall using permitted access methods only
- Add PostgreSQL persistence
- Add Gemini-powered sentiment and review analysis
- Add deeper marketplace matching logic and price comparison ranking
- Prepare the app for RapidAPI publication and monetization
