const controller = require('./backend');
const { isLoggedin, isTeacher } = require('../../middlewares/authentication');
const { openGraphMiddleware } = require('../../middlewares/opg-middleware');
const { upload_file } = require('../../utils/utils');
const { Router } = require('express');
const router = Router();

const upload = upload_file("notes_file", "notes");

router.post('/opportunities', isLoggedin, upload, openGraphMiddleware, controller.upload_opportunity);
router.get('/opportunities', controller.get_opportunities);

module.exports = router;