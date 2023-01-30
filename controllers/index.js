// const { Router } = require("express");

// const router = require('./router');
// const apiRouter = require("./apis");

// const allRouter = new Router();

// // allRouter.use('/', router);
// // allRouter.use('/api', apiRouter);

// allRouter.get('/', (req, res) => {
//     res.render("home", {
//         name: "Eman",
//         address: "2916 1st Ave S, Seattle, WA 98134",

//     });
// });


// allRouter.get('/login', (req, res) => {
//     res.render("login", {
//         title: "HERE IS THE LOGIN PAGE",

//     });
// });

// allRouter.get('/signup', (req, res) => {
//     res.render("signup", {
//         title: "HERE IS THE SIGNUP PAGE",

//     });
// });

// allRouter.get('/dashboard', (req, res) => {
//     res.render("dashboard", {
//         title: "HERE IS THE DASHBOARD PAGE",
//     });
// });

// allRouter.get('/logout', (req, res) => {
//     res.render("logout", {
//         title: "HERE IS THE LOGOUT PAGE",
//     });
// });


// module.exports = allRouter;


const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const homePageRoutes = require('./homePageRoutes');

router.use('/', homePageRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;

