const jsonErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON format in request body",
    });
  }
  next(err);
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
};
