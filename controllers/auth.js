const { response, request } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        console.log(user);

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            })
        }
        user = new User(req.body);

        //*encriptar contrasena ->salt -> num aleatorio -> 10 por defecto
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        //* Generar JWT
        const token = await generateJWT(user._id, user.name);

        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const userLogin = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no coinciden',
            });
        }

        //confirmar contra
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña no coinciden 2',
            });
        }

        //* Generar JWT
        const token = await generateJWT(user._id, user.name);

        res.json({
            ok: true,
            uid: user._id,
            name: user.name,
            token,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const revalidateToken = async (req = request, res = response) => {
    const uid = req.uid;
    const name = req.name;

    //*Generate new JWT y retornar

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    createUser,
    userLogin,
    revalidateToken,
}