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

// Get single post
router.get('/posts/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id, {
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

// Create a post
router.post('/posts', auth, async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        author_id: req.user.id,
    });
    

});

// Update a post
router.put('/posts/:id', auth, async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (post.author_id === req.user.id) {
        await post.update({
            title: req.body.title,
            content: req.body.content,
        });
    }
});


// Delete a post
router.delete('/posts/:id', auth, async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (post.author_id === req.user.id) {
        await post.destroy();
    }
});

module.exports = router;



