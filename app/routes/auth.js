const controller = require('../controllers/auth');
const { Router } = require('express');
const router = Router();

router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/forgot-password', controller.forgot_password);

module.exports = router;