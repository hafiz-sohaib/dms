const controller = require('./backend');
const { isLoggedin, isTeacher } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/opportunities', isLoggedin, controller.upload_opportunity);
router.get('/opportunities', controller.get_opportunities);

module.exports = router;