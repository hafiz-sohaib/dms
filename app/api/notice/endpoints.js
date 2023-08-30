const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/notice', isLoggedin, isAdmin, controller.upload_notice);
router.get('/notice', controller.get_notices);
router.delete('/notice', isLoggedin, isAdmin, controller.delete_notice);

module.exports = router;