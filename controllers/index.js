const { Router } = require("express");

const router = require('./router');
const apiRouter = require("./apis");

const allRouter = new Router();

// allRouter.use('/', router);
// allRouter.use('/api', apiRouter);

allRouter.get('/', (req, res) => {
    res.render("home", {
        name: "Eman",
        address: "2916 1st Ave S, Seattle, WA 98134",

    });
});

allRouter.get('/profile', (req, res) => {
    res.render("profile", {
        title: "Truck Tracker",

    });

});

allRouter.get('/login', (req, res) => {
    res.render("login", {
        title: "Truck Tracker",

    });
});




module.exports = allRouter;
