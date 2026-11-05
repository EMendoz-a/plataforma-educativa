const express = require('express');
const router = express.Router();
const pool = require('./db');
const verificarToken = require('./verificarToken'); 

router.post('/', verificarToken, async (req, res) => {
    try {
        const { titulo, descripcion, instructor } = req.body;
        const nuevoCurso = await pool.query(
            "INSERT INTO cursos (titulo, descripcion, instructor) VALUES ($1, $2, $3) RETURNING *",
            [titulo, descripcion, instructor]
        );
        res.json(nuevoCurso.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el curso" });
    }
});

router.get('/', verificarToken, async (req, res) => {
    try {
        const todosLosCursos = await pool.query("SELECT * FROM cursos");
        res.json(todosLosCursos.rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los cursos" });
    }
});

router.put('/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, instructor } = req.body;
        await pool.query(
            "UPDATE cursos SET titulo = $1, descripcion = $2, instructor = $3 WHERE id = $4",
            [titulo, descripcion, instructor, id]
        );
        res.json({ mensaje: "Curso actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el curso" });
    }
});

router.delete('/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM cursos WHERE id = $1", [id]);
        res.json({ mensaje: "Curso eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el curso" });
    }
});

module.exports = router;