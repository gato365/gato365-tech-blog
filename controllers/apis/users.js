const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');






// POST /users
router.post('/', async (req, res) => {
    try {

        const user = await User.findOne({

            where: {
                email: req.body.email,
            },

        });
        // validate user
        if (!user) {
            res.status(400).json({ message: 'Incorrect email, please try again' });
            return;
        }

        const checkPassword = user.checkPassword(req.body.password);
        if(!checkPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.email = user.email;
            req.session.logged_in = true;
        });

        res.json({ user, message: 'You are now logged in!' });

    } catch (e) {
        res.status(400).json(e);
    }
});

// PUT /users/:id (NEEDS TO BE FIXED)
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

// DELETE /users/:id (NEEDS TO BE FIXED)
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
