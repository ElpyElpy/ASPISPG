const router = require('express').Router();
const portfolioController = require('../controllers/portfolioController');


router.get('/closed/getportfolio', portfolioController.get);

router.get('/closed/getprice', portfolioController.getPrice)

router.post('/closed/quote', portfolioController.quote);




module.exports = router