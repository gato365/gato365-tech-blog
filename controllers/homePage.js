const { Router } = require('express');

const auth = require('../middleware/auth');
const { User, Post, Comment } = require('../models');
const optionalAuth = require('../middleware/optionalAuth');

const router = new Router();


// // GET /homePage

router.get('/', auth, async (req, res) => {
    const plainUser = req.user.get({ plain: true });

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

    const plainPosts = posts.map(post => post.get({ plain: true }));

    res.render('homePage', {
        user: plainUser,
        posts: plainPosts,
    });

});
    

// Log in page
router.get('/login', optionalAuth, (req, res) => {
    res.render('login');
});

// Sign up page
router.get('/signup', optionalAuth, (req, res) => {
    res.render('signup');
});


// Log out
router.get('/logout', auth, (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


// Dashboard page
router.get('/dashboard', auth, async (req, res) => {
    const plainUser = req.user.get({ plain: true });

    const posts = await Post.findAll({
        where: {
            author_id: req.user.id,
        },
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

    const plainPosts = posts.map(post => post.get({ plain: true }));

    res.render('dashboard', {
        user: plainUser,
        posts: plainPosts,
    });
});

