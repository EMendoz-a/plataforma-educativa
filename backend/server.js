// Importamos las librerías necesarias
const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const pool = require('./db');

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('¡El servidor de la Plataforma Educativa está funcionando!');
});

// Rutas de autenticación
app.use('/api/auth', require('./auth'));

app.use('/api/cursos', require('./cursos'));

// Inicio de servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
});