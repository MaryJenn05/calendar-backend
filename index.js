//* Es como el import
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

require('dotenv').config();
//crear el servidor de express
const app = express();

//*Database
dbConnection();

app.use(cors());

//public directory
//midleware -> va a mostrar el html en /
app.use(express.static('public'));

//Rutas
//todo: auth //crear, login, renew
//* todo lo que expotrte routes lo va a mostrar en api/auth

//Lectura y parseo de body
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));


//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${4000}`);
})