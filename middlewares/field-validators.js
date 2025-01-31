const { response } = require('express');
const { validationResult } = require('express-validator');

//* Next -> función si es que está bien -> pasa al siguiente
const fieldValidator = (req, res = response, next) => {

    //Manejo de errors con middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

module.exports = {
    fieldValidator
}