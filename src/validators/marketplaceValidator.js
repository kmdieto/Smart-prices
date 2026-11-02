export function validateSearchQuery(req, res, next) {
  const query = String(req.query.q || '').trim();
  const productUrl = String(req.query.url || '').trim();

  if (!query && !productUrl) {
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: 'Provide either "q" or a supported "url" query parameter.',
      },
    });
  }

  if (productUrl) {
    try {
      new URL(productUrl);
    } catch {
      return res.status(400).json({
        success: false,
        error: {
          status: 400,
          message: 'The provided "url" is not valid.',
        },
      });
    }
  }

  req.query.q = query;
  req.query.url = productUrl;
  next();
}

export function validateComparePayload(req, res, next) {
  const { products } = req.body || {};

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: 'Request body must include a non-empty "products" array.',
      },
    });
  }

  next();
}
