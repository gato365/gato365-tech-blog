const { Router } = require ("express");

const router = require('./router');
const apiRouter = require("./apis");

const allRouter = new Router();

allRouter.use('/', router);
allRouter.use('/api', apiRouter);

module.exports = allRouter;
