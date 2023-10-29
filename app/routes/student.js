const controller = require('../controllers/student');
const { isLoggedin, isStudent } = require('../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.get('/dashboard', isLoggedin, isStudent, controller.dashboard);
router.get('/notes', isLoggedin, isStudent, controller.notes);
router.get('/opportunities', isLoggedin, isStudent, controller.opportunities);
router.get('/notice-board', isLoggedin, isStudent, controller.notice_board);
router.get('/chat', isLoggedin, isStudent, controller.chat);

module.exports = router;