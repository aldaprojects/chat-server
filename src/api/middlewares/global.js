
const validateId = (req, res, next) => {
    const id = req.query.id;

    if( !id ) {
        return res.status(400).json({
            ok: false,
            error: `query param 'id' is required`,
            body: null
        });
    } else {
        if( id.length !== 24 ) {
            return res.status(404).json({
                ok: false,
                error: `'id' must be a single String of 12 bytes or a string of 24 characters`,
                body: null
            });
        }
    }

    next();
}

const hasBody = (req, res, next) => {

    const body = req.body;

    if( !body ) {
        return res.status(400).json({
            ok: false,
            error: `body is required`,
            body: null
        });
    }

    next();

}

module.exports = {
    validateId,
    hasBody
}