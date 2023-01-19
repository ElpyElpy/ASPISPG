const router = require('express').Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');
const verifyJwt = require('../helpers/jwtManagement/verifyJwt');
const testController = require('../controllers/testController');
const testClosedController = require('../controllers/testClosedController');

router.post('/t', testController.doSmth);
router.get('/closed/t', testClosedController.doSmth);




module.exports = router