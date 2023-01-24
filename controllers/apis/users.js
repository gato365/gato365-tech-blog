const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


// GET /users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


// GET /users/:id

router.get('/:id', async (req, res) => {
try{    
    const user = await User.findById(req.params.id);
    res.json(user);
} catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
}
});


// POST /users
router.post('/', async (req, res) => {
    try {
        const user = await User.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(user);
    } catch (e) {
        res.status(400).json(e);
    }
});

// PUT /users/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const user = await User.update(
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
        res.json(user);
    } catch (e) {
        res.status(400).json(e);
    }
});

// DELETE /users/:id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(user);
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;
