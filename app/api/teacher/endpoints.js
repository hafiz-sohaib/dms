const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/teacher', isLoggedin, isAdmin, controller.add_teacher);
router.get('/teacher', controller.get_teachers);
router.put('/teacher', isLoggedin, isAdmin, controller.update_teacher);
router.delete('/teacher', isLoggedin, isAdmin, controller.delete_teacher);

module.exports = router;