const controller = require('../controllers/teacher');
const { isLoggedin } = require('../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.get('/dashboard', isLoggedin, controller.dashboard);
// router.get('/login', controller.login);
// router.get('/forgot-password', controller.forgot_password);

module.exports = router;