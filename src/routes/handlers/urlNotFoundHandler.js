const urlNotFoundHandler = (req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: 'true',
    errors: [{ msg: `Can't find ${req.originalUrl} on this server!` }],
  });
};

module.exports = urlNotFoundHandler;
