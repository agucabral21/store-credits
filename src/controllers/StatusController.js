class StatusController {
  static async status(req, res) {
    const response = {
      status: 'ok',
      error: false,
    };
    return res.status(200).send(response);
  }
}

module.exports = StatusController;
