const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');






// POST /posts (THis is saving the post to the database)
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

module.exports = router;