const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Db online');
    } catch (error) {
        throw new Error('Error a la hora de inicializar base de datos ')
    }
}

module.exports = {
    dbConnection
}