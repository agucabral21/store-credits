const router = require('express').Router();
const CreditController = require('../../controllers/CreditController');

router.route('/').get(CreditController.getCredits);
router.route('/').put(CreditController.updateCredits);

module.exports = router;
