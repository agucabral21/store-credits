const router = require('express').Router();

const urlNotFoundHandler = require('./handlers/urlNotFoundHandler');

router.use('/status', require('./status'));
router.use('/credits', require('./credits'));
//for wrong urls
router.all('*', urlNotFoundHandler);

module.exports = router;
