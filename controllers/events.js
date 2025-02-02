const { response, request } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    //* Populate para retornar el usuario
    const events = await Event.find()
        .populate('user', 'name');

    res.status(200).json(
        {
            ok: true,
            events
        }
    )

}

const createEvent = async (req = request, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        return res.status(200).json(
            {
                ok: true,
                event: savedEvent,
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                ok: false,
                msg: 'Hable con el adm'
            }
        );
    }
}

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'No existe Evento'
                }
            );
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json(
                {
                    ok: false,
                    msg: 'No tiene permiso para editar este evento'
                }
            );
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.status(200).json(
            {
                ok: true,
                eventId,
                event: updateEvent,
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                msg: 'Hable con el adm'
            }
        );
    }

}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;


    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'No existe Evento con este id'
                }
            );
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json(
                {
                    ok: false,
                    msg: 'No tiene permiso para eliminar este evento'
                }
            );
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json(
            {
                ok: true
            }
        );

    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                msg: 'Hable con el adm'
            }
        );
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}