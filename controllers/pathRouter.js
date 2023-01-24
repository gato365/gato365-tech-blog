const jwt = require('jsonwebtoken');
const { Router } = require("express");
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { check, validationResult } = require('express-validator');

const pathRouter = new Router();


// Get all posts
pathRouter.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Get all comments
pathRouter.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Get all users
pathRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


// Get one user
pathRouter.get('/users/:id', async (req, res) => {
    try {
        const
            user = await User.findById(req.params.id);
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Get one post
pathRouter.get('/posts/:id', async (req, res) => {
    try {
        const

            post = await Post.findById(req.params.id);
        res.json(post);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});



// Get one comment
pathRouter.get('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.json(comment);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});



// Create a new user
pathRouter.post('/users', [
    check('email', 'Incorrect email').isEmail(), //not correct
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration'
            });
        }
        const { email, password } = req.body;
        const candidate = await User.findOne({
            email
        });
        if (candidate) {
            return res.status(400).json({ message: 'This user already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: 'User has been created' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


// Create a new post
pathRouter.post('/posts', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const post = new Post({
            title,
            content,
            author
        });
        await post.save();
        res.status(201).json({ message: 'Post has been created' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});
// Create a new comment

// Update a user
// Update a post
// Update a comment

// Delete a user
// Delete a post
// Delete a comment

module.exports = pathRouter;