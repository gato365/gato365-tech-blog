

const router = require('express').Router();

const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const homePageRoutes = require('./homePageRoutes');

router.use('/', homePageRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;

