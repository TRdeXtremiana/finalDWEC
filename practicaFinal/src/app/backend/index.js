const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Conexión a Redis
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
    console.log('Error al conectar a Redis:', err);
});

// Rutas y controladores aquí

// Iniciar el servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});