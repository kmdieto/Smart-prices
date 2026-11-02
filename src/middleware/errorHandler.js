export class AppError extends Error {
  constructor(statusCode = 500, message = 'Internal Server Error', details = null) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function notFoundHandler(req, res, next) {
  next(new AppError(404, `Route not found: ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message,
      details: err.details || null,
      path: req.originalUrl,
    },
  });
}
