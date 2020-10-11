const { error } = require('../../config/errors');

const validateId = (req, res, next) => {
    const id = req.query.id;

    if( !id ) {
        return res.status(400).json({
            ok: false,
            error: `query param 'id' is required`,
            body: null,
            error_code: error.idrequired
        });
    } else {
        if( id.length !== 24 ) {
            return res.status(404).json({
                ok: false,
                error: `'id' must be a single String of 12 bytes or a string of 24 characters`,
                body: null,
                error_code: error.notlength
            });
        }
    }

    next();
}

const hasBody = (req, res, next) => {

    console.log('entro')

    const body = req.body;

    if( !body ) {
        return res.status(400).json({
            ok: false,
            error: `body is required`,
            body: null,
            error_code: error.bodyrequired
        });
    }

    next();

}

module.exports = {
    validateId,
    hasBody
}