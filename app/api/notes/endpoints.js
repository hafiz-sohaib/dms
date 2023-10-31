const controller = require('./backend');
const { isLoggedin, isTeacher } = require('../../middlewares/authentication');
const { upload_file } = require('../../utils/utils');
const { Router } = require('express');
const router = Router();

const upload = upload_file("notes_file", "notes");

router.post('/notes', isLoggedin, upload, controller.upload_notes);
router.get('/notes', controller.get_notes);
router.get('/notes/download/:fileName', isLoggedin, controller.download_notes);

module.exports = router;