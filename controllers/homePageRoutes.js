const { Router } = require("express");

const { User, Post, Comment } = require('../models');
const apiRouter = require("./api");

const allRouter = new Router();

// allRouter.use('/', router);
// allRouter.use('/api', apiRouter);

// Home
allRouter.get('/', async (req, res) => {
   let posts = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'username'],
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username'],
                    },
                ],
            },
        ]

    });


    posts = posts.map((post) => post.get({ plain: true }));

    res.render("home", {
        posts
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


// Logout
allRouter.get('/logout', (req, res) => {
    res.render("logout", {
        title: "HERE IS THE LOGOUT PAGE",
    });
});


module.exports = allRouter;
