const jsonErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON format in request body",
    });
  }
  next(err);
};

const routeNotFound = (req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested URL ${req.method} ${req.originalUrl} was not found on this server.`,
  });
};

// middleware to handle all unhandled errors
const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Something went wrong! Please try again later.",
  });
};

module.exports = {
  jsonErrorHandler,
  globalErrorHandler,
  routeNotFound,
};
