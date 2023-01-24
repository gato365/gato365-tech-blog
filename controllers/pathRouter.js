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
        const { title, post_text, user_id } = req.body;
        const post = new Post({
            title,
            post_text,
            user_id
        });
        await post.save();
        res.status(201).json({ message: 'Post has been created' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});
// Create a new comment
pathRouter.post('/comments', async (req, res) => {
    try {
        const { comment_text, user_id, post_id } = req.body;
        const comment = new Comment({
            comment_text,
            user_id,
            post_id
        });
        await comment.save();
        res.status(201).json({ message: 'Comment has been created' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Update a user
pathRouter.put('/users/:id', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findById(req.params.id);
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = password;
        }
        await user.save();
        res.status(201).json({ message: 'User has been updated' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


// Update a post
pathRouter.put('/posts/:id', async (req, res) => {
    try {
        const { title, post_text, user_id } = req.body;
        const post = await Post.findById(req.params.id);
        if (title) {
            post.title = title;

        }
        if (post_text) {
            post.post_text = post_text;
        }
        if (user_id) {
            post.user_id = user_id;
        }
        await post.save();
        res.status(201).json({ message: 'Post has been updated' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Update a comment

pathRouter.put('/comments/:id', async (req, res) => {
    try {
        const { comment_text, user_id, post_id } = req.body;    
        const comment = await Comment.findById(req.params.id);
        if (comment_text) {
            comment.comment_text = comment_text;
        }
        if (user_id) {
            comment.user_id = user_id;
        }
        if (post_id) {
            comment.post_id = post_id;
        }
        await comment.save();
        res.status(201).json({ message: 'Comment has been updated' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Delete a user

pathRouter.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.remove();
        res.status(201).json({ message: 'User has been deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Delete a post

pathRouter.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        await post.remove();
        res.status(201).json({ message: 'Post has been deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


// Delete a comment


pathRouter.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        await comment.remove();
        res.status(201).json({ message: 'Comment has been deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

module.exports = pathRouter;