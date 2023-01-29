const { Router } = require ("express");

const router = require('./router');
const apiRouter = require("./apis");

const allRouter = new Router();

// allRouter.use('/', router);
// allRouter.use('/api', apiRouter);

allRouter.get('/', (req, res) => {
    res.render("home");
});

module.exports = allRouter;
