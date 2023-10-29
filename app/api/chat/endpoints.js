const controller = require('./backend');
const { isLoggedin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/chat', isLoggedin, controller.save_chat);
router.post('/group-chat', isLoggedin, controller.save_group_chat);

module.exports = router;