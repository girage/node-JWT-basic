const expess = require('express');
const router = expess.Router();
const { login, dashboard } = require('../controllers/main');

const authMiddelware = require('../middleware/auth');

router.route('/dashboard').get(authMiddelware, dashboard);
router.route('/login').post(login);

module.exports = router;