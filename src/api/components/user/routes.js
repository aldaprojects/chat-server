const express = require('express');
const router = express.Router();

const { hasBody, validateId } = require('../../middlewares/global');

const { validateBody, validateLogin } = require('./middlewares');
const userService = require('./services');

router.post('/', [hasBody, validateBody], (req, res) => {

    const user = req.body;

    userService.createUser(user, (err, newUser) => {
        if( err ) {
            console.log(err)
            return res.status(err.status).json({
                ok: false,
                error: err.message,
                body: null,
                error_code: err.error_code
            });
        }

        return res.status(200).json({
            ok: true,
            error: null,
            body: newUser
        });

    });

});

router.post('/login', [hasBody, validateLogin], (req, res) => {

    const user = req.body;

    userService.login(user, (err, userDB) => {
        if( err ) {
            console.log(err)
            return res.status(err.status).json({
                ok: false,
                error: err.message,
                body: null,
                error_code: err.error_code
            });
        }
        console.log(userDB)
        return res.status(200).json({
            ok: true,
            error: null,
            body: userDB
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
                body: null,
                error_code: err.error_code
            });
        }

        return res.status(200).json({
            ok: true,
            error: null,
            body: user
        });
    })
});

router.put('/', [validateId, hasBody, validateBody], (req, res) => {

    const user = req.body;
    user.id = req.query.id;

    console.log('put', user)

    userService.updateUser(user, (err, newUser) => {
        if( err ) {
            return res.status(err.status).json({
                ok: false,
                error: err.message,
                body: null,
                error_code: err.error_code
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
                body: null,
                error_code: err.error_code
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