const router = require('express').Router();
const controller = require('../controllers/teacher');
const { isLoggedin, isTeacher } = require('../middlewares/authentication');

router.get('/dashboard', isLoggedin, isTeacher, controller.dashboard);
router.get('/profile', isLoggedin, isTeacher, controller.profile);
router.get('/notification', isLoggedin, isTeacher, controller.notification);
router.get('/notes', isLoggedin, isTeacher, controller.notes);
router.get('/exam-outline', isLoggedin, isTeacher, controller.exam_outline);
router.get('/opportunities', isLoggedin, isTeacher, controller.opportunities);
router.get('/notice-board', isLoggedin, isTeacher, controller.notice_board);
router.get('/chat', isLoggedin, isTeacher, controller.chat);

module.exports = router;