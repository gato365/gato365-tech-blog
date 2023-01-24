const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Get one comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        res.json(comment);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(comment);
    } catch (e) {
        res.status(400).json(e);
    }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.update(
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

        res.status(200).json(comment);
    } catch (e) {
        res.status(400).json(e);
    }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!comment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(comment);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;