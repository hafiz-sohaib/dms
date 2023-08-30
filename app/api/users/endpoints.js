const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.get('/users', isLoggedin, isAdmin, controller.get_users);
router.put('/users/block', isLoggedin, isAdmin, controller.block_user);
router.put('/users/unblock', isLoggedin, isAdmin, controller.unblock_user);

module.exports = router;