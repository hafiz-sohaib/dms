const router = require('express').Router();
const controller = require('../controllers/auth');

router.get('/register', controller.register);
router.get('/login', controller.login);

module.exports = router;