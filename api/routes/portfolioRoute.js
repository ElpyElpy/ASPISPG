const router = require('express').Router();
const portfolioController = require('../controllers/portfolioController');
const { defineLoadingParams } = require('../helpers/loadImage/loadImage');


const upload = defineLoadingParams();

router.post('/closed/create', upload.single('icon'), portfolioController.create);

router.get('/getsomeoneportfolio', portfolioController.getSomeonePortfolio);

router.get('/closed/getportfolio', portfolioController.get);

router.get('/getallportfolios', portfolioController.getAll);

router.get('/closed/isUsersportfolio', portfolioController.isUsersPortfolio);

router.get('/closed/getprice', portfolioController.getPrice)

router.post('/closed/quote', portfolioController.quote);



module.exports = router