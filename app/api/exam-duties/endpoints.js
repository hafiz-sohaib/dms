const router = require('express').Router();
const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');

router.post('/exam-duties', isLoggedin, isAdmin, controller.set_duty);
router.get('/exam-duties', controller.get_duties);
router.put('/exam-duties/:id', isLoggedin, isAdmin, controller.update_duty);
router.delete('/exam-duties/:id', isLoggedin, isAdmin, controller.delete_duty);

module.exports = router;