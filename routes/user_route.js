const express = require('express');
const router = express.Router();

const { validateId, validateBody } = require('../middlewares/user_midd');
const userService = require('../services/user_service');

router.post('/', validateBody, (req, res) => {

    const user = req.body;

    userService.createUser(user, (err, newUser) => {
        if( err ) {
            return res.status(err.status).json({
                ok: false,
                error: err.message,
                body: null
            });
        }

        return res.status(200).json({
            ok: true,
            error: null,
            body: newUser
        });

    });

});

router.get('/', validateId, (req, res) => {

    const id = req.query.id;

    userService.getUser(id, (err, user) => {
        if( err ) {
            return res.status(err.status).json({
                ok: false,
                error: err.message,
                body: null
            });
        }

        return res.status(200).json({
            ok: true,
            error: null,
            body: user
        });
    })
});

router.put('/', validateBody, (req, res) => {

    const user = req.body;


    userService.updateUser(user, (err, newUser) => {
        if( err ) {
            return res.status(err.status).json({
                ok: false,
                error: err.message,
                body: null
            });
        }

        return res.status(200).json({
            ok: true,
            error: null,
            body: newUser
        });

    });
});

router.delete('/', validateId, (req, res) => {
    const id = req.query.id;

    userService.deleteUser(id, (err, user) => {
        if( err ) {
            return res.status(err.status).json({
                ok: false,
                error: err.message,
                body: null
            });
        }

        return res.status(200).json({
            ok: true,
            error: null,
            body: user
        });
    })
});


module.exports = router;