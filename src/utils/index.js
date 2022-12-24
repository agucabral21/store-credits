const errorResponse = (message, data) => {
  return {
    error: true,
    message,
    data,
  };
};

module.exports = { errorResponse };
