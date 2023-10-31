const router = require('express').Router();
const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');

router.post('/teachers', isLoggedin, isAdmin, controller.add_teacher);
router.get('/teachers', controller.get_teachers);
router.put('/teachers/:id', isLoggedin, isAdmin, controller.update_teacher);
router.delete('/teachers/:id', isLoggedin, isAdmin, controller.delete_teacher);

module.exports = router;