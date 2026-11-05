const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado.' });
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(400).json({ error: 'El token no es válido o ya expiró.' });
    }
}

module.exports = verificarToken;