const { Router } = require('express');

const auth = require('../middleware/auth');
const { Blog, Post, Comment } = require('../models');
const optionalAuth = require('../middleware/optionalAuth');

const pathRouter = new Router();