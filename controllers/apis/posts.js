const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


// GET /posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// GET /posts/:id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


// GET /posts/:id/comments
router.get('/:id/comments', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comments = await post.getComments();
        res.json(comments);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// POST /posts
router.post('/', withAuth, async (req, res) => {
    try {
        const post = await Post.create({
            ...req.body,
            user_id: req.session.user_id,

        });
    } catch (e) {
        res.status(400).json(e);
    }
});


// PUT /posts/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.update(
            {
                ...req.body,
                user_id: req.session.user_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
    } catch (e) {
        res.status(400).json(e);
    }
});

// DELETE /posts/:id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
    } catch (e) {
        res.status(400).json(e);
    }
});