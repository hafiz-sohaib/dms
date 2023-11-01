const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');
const { upload_file } = require('../../utils/utils');
const { Router } = require('express');
const router = Router();

const upload = upload_file('timetable', 'timetables');

router.post('/timetables', isLoggedin, isAdmin, upload, controller.upload_timetables);
router.get('/timetables', controller.get_timetables);
router.delete('/timetables/:id', isLoggedin, isAdmin, controller.delete_timetable);

module.exports = router;