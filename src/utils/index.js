const errorResponse = (message, data) => {
  return {
    error: true,
    message,
    data,
  };
};

const okResponse = (data) => {
  return {
    error: false,
    data,
  };
};

module.exports = { okResponse, errorResponse };
