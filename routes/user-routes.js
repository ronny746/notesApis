const express = require('express');
const { getAllUser, signup, login, Update, deleteUser, sendOtp, verifyOtp } = require('../controllers/user-controller');
const router = express.Router();


router.route('/user/sendotp').post(sendOtp);
router.route('/user/verifyotp').post(verifyOtp);
router.route('/user').get(getAllUser);
router.route('/user/signup').post(signup);
router.route('/user/login').post(login);
router.route('/user/update/:id').put(Update);
router.route('/user/delete/:id').get(deleteUser);
module.exports = router;