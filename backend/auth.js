const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const pool = require('./db'); 
require('dotenv').config();

router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = await bcrypt.hash(password, salt);

        await pool.query(
            "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)",
            [nombre, email, passwordEncriptada]
        );

        res.json({ mensaje: "Usuario registrado con éxito en la plataforma" });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario. Tal vez el correo ya existe." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        if (usuario.rows.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }
        
        const passwordValida = await bcrypt.compare(password, usuario.rows[0].password);
        if (!passwordValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        
        const token = jwt.sign({ id: usuario.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        
        res.json({ token: token });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor al intentar iniciar sesión" });
    }
});

module.exports = router;