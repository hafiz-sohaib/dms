const controller = require('./backend');
const { isLoggedin, isAdmin } = require('../../middlewares/authentication');
const { Router } = require('express');
const router = Router();

router.post('/exam-duties', isLoggedin, isAdmin, controller.set_duty);
router.get('/exam-duties', controller.get_duties);
router.put('/exam-duties', isLoggedin, isAdmin, controller.update_duty);
router.delete('/exam-duties', isLoggedin, isAdmin, controller.delete_duty);

module.exports = router;