export function analyzeReviewSentiment(reviews = []) {
  const positiveKeywords = ['good', 'great', 'excellent', 'amazing', 'fast', 'reliable', 'love', 'satisfied'];
  const negativeKeywords = ['bad', 'slow', 'broken', 'poor', 'late', 'cheap', 'defective', 'terrible'];

  const normalizedReviews = reviews.map((review) => String(review || '').trim());

  let positive = 0;
  let negative = 0;

  for (const review of normalizedReviews) {
    const text = review.toLowerCase();

    if (positiveKeywords.some((keyword) => text.includes(keyword))) {
      positive += 1;
    }

    if (negativeKeywords.some((keyword) => text.includes(keyword))) {
      negative += 1;
    }
  }

  const total = normalizedReviews.length || 1;
  const sentimentScore = Number((((positive - negative) / total) * 100).toFixed(2));

  return {
    reviewCount: normalizedReviews.length,
    positiveReviewCount: positive,
    negativeReviewCount: negative,
    sentimentScore,
    summary:
      normalizedReviews.length === 0
        ? 'No review data was provided.'
        : sentimentScore >= 0
          ? 'Overall review sentiment is positive.'
          : 'Overall review sentiment is negative.',
  };
}
