/*
    Rutas de Auth -Usuarios
    host + /api/auth
*/

const { Router } = require('express');
const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { tokenValidator } = require('../middlewares/token-validator');
const router = Router();

router.post('/register',
    [//Middlewares
        check('name', 'The field name is required').not().isEmpty(),
        check('email', 'The field email is required').isEmail(),
        check('password', 'The password is required').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser);

router.post('/',
    [
        check('email', 'The field email is required').isEmail(),
        check('password', 'The password is required').isLength({ min: 6 }),
        fieldValidator
    ],
    userLogin
);

router.get('/renew', tokenValidator, revalidateToken);


module.exports = router;