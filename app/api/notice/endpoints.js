const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/notices', isLoggedin, isAdmin, controller.upload_notice);
router.get('/notices', controller.get_notices);
router.delete('/notices/:id', isLoggedin, isAdmin, controller.delete_notice);

module.exports = router;