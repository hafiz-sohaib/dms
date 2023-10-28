const router = require('express').Router();
const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');

router.post('/students', isLoggedin, isAdmin, controller.add_student);
router.get('/students', controller.get_students);
router.put('/students/:id', isLoggedin, isAdmin, controller.update_student);
router.delete('/students/:id', isLoggedin, isAdmin, controller.delete_student);

module.exports = router;