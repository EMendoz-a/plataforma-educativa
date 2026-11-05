import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

export default function Dashboard() {
    const [cursos, setCursos] = useState([]);
    
    // Estados para el formulario de nuevo curso
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [instructor, setInstructor] = useState('');

    // Leer Cursos (GET)
    const obtenerCursos = async () => {
        const token = localStorage.getItem('token');
        try {
            const respuesta = await axios.get('https://plataforma-educativa-r759.onrender.com/api/cursos', {
                headers: { Authorization: token }
            });
            setCursos(respuesta.data);
        } catch (error) {
            console.error("Error al obtener los cursos", error);
        }
    };

    useEffect(() => {
        obtenerCursos();
    }, []);

    const agregarCurso = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('https://plataforma-educativa-r759.onrender.com/api/cursos', 
                { titulo, descripcion, instructor },
                { headers: { Authorization: token } }
            );
            setTitulo(''); setDescripcion(''); setInstructor('');
            // Recargamos la lista
            obtenerCursos();
        } catch (error) {
            console.error("Error al crear curso", error);
        }
    };

    const eliminarCurso = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`https://plataforma-educativa-r759.onrender.com/api/cursos/${id}`, {
                headers: { Authorization: token }
            });
            obtenerCursos();
        } catch (error) {
            console.error("Error al eliminar curso", error);
        }
    };

    const cerrarSesion = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="dashboard-container">
            <h2 className="titulo-principal">Panel de Cursos Activos</h2>
            
            <form className="formulario-curso" onSubmit={agregarCurso}>
                <input className="input-curso" type="text" placeholder="Título del curso" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <input className="input-curso" type="text" placeholder="Descripción" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <input className="input-curso" type="text" placeholder="Instructor" required value={instructor} onChange={(e) => setInstructor(e.target.value)} />
                <button className="btn-agregar" type="submit">Agregar Curso</button>
            </form>

            {cursos.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No hay cursos disponibles.</p>
            ) : (
                <div className="grid-cursos">
                    {cursos.map(curso => (
                        <div key={curso.id} className="tarjeta-curso">
                            <button className="btn-eliminar" onClick={() => eliminarCurso(curso.id)}>×</button>
                            <h3>{curso.titulo}</h3>
                            <p>{curso.descripcion}</p>
                            <p><strong>Instructor:</strong> {curso.instructor}</p>
                        </div>
                    ))}
                </div>
            )}

            <button className="btn-salir" onClick={cerrarSesion}>Cerrar Sesión</button>
        </div>
    );
}