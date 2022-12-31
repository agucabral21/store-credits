const errorResponse = (message, data) => {
  return {
    error: true,
    message,
    data,
  };
};

const okResponse = (data, message) => {
  return {
    error: false,
    data,
    message,
  };
};

module.exports = { okResponse, errorResponse };
