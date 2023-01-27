const router = require('express').Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');
const verificationController = require('../controllers/verificationController');


router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/closed/test', async (req, res) => {
    res.status(200).send(`closed route activated!`);
})
router.get('/closed/logout', logoutController.logout);
router.get('/closed/verificate', verificationController.verificate)

router.get('/test', async (req, res) => {
    res.status(200).send(`open route activated!`);
})



module.exports = router