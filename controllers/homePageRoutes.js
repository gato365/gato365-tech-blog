const { Router } = require("express");

const router = require('./router');
const apiRouter = require("./api");

const allRouter = new Router();

// allRouter.use('/', router);
// allRouter.use('/api', apiRouter);

// Home
allRouter.get('/', (req, res) => {
    res.render("home", {
        name: "Eman",
        address: "2916 1st Ave S, Seattle, WA 98134",

    });
});

// Login
allRouter.get('/login', (req, res) => {
    res.render("login", {
        title: "HERE IS THE LOGIN PAGE",

    });
});

// Signup
allRouter.get('/signup', (req, res) => {
    res.render("signup", {
        title: "HERE IS THE SIGNUP PAGE",

    });
});

// Dashboard
allRouter.get('/dashboard', (req, res) => {
    res.render("dashboard", {
        title: "HERE IS THE DASHBOARD PAGE",
    });
});
// Logout
allRouter.get('/logout', (req, res) => {
    res.render("logout", {
        title: "HERE IS THE LOGOUT PAGE",
    });
});


module.exports = allRouter;
