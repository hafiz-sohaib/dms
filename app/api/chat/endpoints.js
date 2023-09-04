const controller = require('./backend');
const { isLoggedin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/chat', isLoggedin, controller.chat);

module.exports = router;