const controller = require('../controllers/student');
const { isLoggedin, isStudent } = require('../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.get('/dashboard', isLoggedin, isStudent, controller.dashboard);
// router.get('/login', controller.login);
// router.get('/forgot-password', controller.forgot_password);

module.exports = router;