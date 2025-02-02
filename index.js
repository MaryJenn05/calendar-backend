const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

require('dotenv').config();

const app = express();

dbConnection();

app.use(cors());

//midleware -> va a mostrar el html en /
app.use(express.static(__dirname + '/public'));

//Rutas
//Lectura y parseo de body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

//peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})