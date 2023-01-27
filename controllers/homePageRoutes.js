const { Router } = require('express');

// const auth = require('../middleware/auth');
const { User, Post, Comment } = require('../models');
// const optionalAuth = require('../middleware/optionalAuth');

const router = new Router();


// Location 1: 
// WHEN I click on the homepage option
// THEN I am taken to the homepage
// WHEN I click on any other links in the navigation
// THEN I am prompted to either sign up or sign in

// Get Dashboard page 
// On Home Page the user can see all posts (dashboard is seen)
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



// GET /homePage (landing page)
router.get('/', auth, async (req, res) => {
   

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
        
        posts: plainPosts
    });
// Login, Dashboard, Home Page
});
    

// Log in page
router.get('/login', optionalAuth, (req, res) => {
    res.render('login');
    // Login, Dashboard, Home Page
});

// Sign up page
router.get('/signup', optionalAuth, (req, res) => {
    res.render('signup');
    // Login, Dashboard, Home Page
});


// Log out
router.get('/logout', optionalAuth, (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
    // Login, Dashboard, Home Page
});


module.exports = router;