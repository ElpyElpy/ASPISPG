const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const dotenv = require('dotenv');
const verifyJwt = require('./helpers/jwtManagement/verifyJwt');
const authRoute = require('./routes/authRoute.js');
const portfolioRoute = require('./routes/portfolioRoute.js');
// const testRoute = require('./routes/testRoute.js');
const cors = require('cors');


// configuration
dotenv.config();

// middlware
app.use(cors({
    origin: 'http://localhost',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept",
        "Access-Control-Allow-Credentials"
    );
    next();
});


app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use('*/closed', verifyJwt.isVerified);


// routes
app.use("/api/auth", authRoute);
app.use("/api/portfolio", portfolioRoute);
// app.use("/api/test", testRoute);


app.listen(5000, () => {
    console.log('Backend server is running...');
})
