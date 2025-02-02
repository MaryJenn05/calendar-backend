/*
    Rutas de Events 
    host + /api/events
*/

const express = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { tokenValidator } = require('../middlewares/token-validator');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');

const router = express.Router();

router.use(tokenValidator)

router.get('/', getEvents);

router.post('/', [
    check('title', 'The field title is required').not().isEmpty(),
    check('start', 'The date of start is required').custom(isDate),
    check('end', 'The date of end is required').custom(isDate),
    fieldValidator
], createEvent)

router.put('/:id', [
    check('title', 'The field title is required').not().isEmpty(),
    check('start', 'The date of start is required').custom(isDate),
    check('end', 'The date of end is required').custom(isDate),
    fieldValidator
], updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router;