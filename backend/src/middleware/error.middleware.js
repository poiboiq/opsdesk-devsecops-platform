function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);

  res.status(error.status || 500).json({
    error: error.message || 'Internal server error'
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
