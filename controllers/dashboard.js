const { Router } = require('express');

const auth = require('../middleware/auth');
const { User, Post, Comment } = require('../models');
const optionalAuth = require('../middleware/optionalAuth');

const router = new Router();

// Get all posts
router.get('/posts', async (req, res) => {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['id', 'username'],
            },
            {
                model: Comment,
                as: 'comments',
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['id', 'username'],
                    },
                ],
            },
        ]
    });
    

});
// // GET /homePage


