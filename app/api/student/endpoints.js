const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/student', isLoggedin, isAdmin, controller.add_student);
router.get('/student', controller.get_students);
router.put('/student', isLoggedin, isAdmin, controller.update_student);
router.delete('/student', isLoggedin, isAdmin, controller.delete_student);

module.exports = router;