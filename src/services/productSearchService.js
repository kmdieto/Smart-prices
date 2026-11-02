export function matchesQuery(product = {}, rawQuery = '') {
  const query = String(rawQuery || '').trim().toLowerCase();

  if (!query) {
    return true;
  }

  const haystack = [
    product.title,
    product.brand,
    product.model,
    product.store,
    product.seller,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

export function filterProductsByQuery(products = [], query = '') {
  return products.filter((product) => matchesQuery(product, query));
}
