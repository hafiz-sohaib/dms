const controller = require('../controllers/admin');
const { isLoggedin, isAdmin } = require('../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.get('/dashboard', isLoggedin, isAdmin, controller.dashboard);
router.get('/profile', isLoggedin, isAdmin, controller.profile);
router.get('/manage-student', isLoggedin, isAdmin, controller.manage_student);
router.get('/manage-teacher', isLoggedin, isAdmin, controller.manage_teacher);
router.get('/manage-notices', isLoggedin, isAdmin, controller.manage_notices);
router.get('/manage-exam-duties', isLoggedin, isAdmin, controller.manage_exam_duties);
router.get('/manage-user-accounts', isLoggedin, isAdmin, controller.manage_user_accounts);

module.exports = router;