const express = require('express');

const { Schema, model } = require('mongoose');

const EventSchema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        user: {
            // ** Referencia a otro schema
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }
);

//* Solo es par el objeto no cambia nada cuando se persiste
EventSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Event', EventSchema)
