const controller = require('./backend');
const { isLoggedin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/group', isLoggedin, controller.create_group);

module.exports = router;