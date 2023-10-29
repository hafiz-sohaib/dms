const controller = require('./backend');
const { isLoggedin, isTeacher } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/notifications', isLoggedin, isTeacher, controller.send_notification);
router.get('/notifications', controller.get_notifications);

module.exports = router;