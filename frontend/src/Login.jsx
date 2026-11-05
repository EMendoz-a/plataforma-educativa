import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const iniciarSesion = async (e) => {
        e.preventDefault(); 
        try {
            const respuesta = await axios.post('https://plataforma-educativa-r759.onrender.com/api/auth/login', {
                email: email,
                password: password
            });
            
            localStorage.setItem('token', respuesta.data.token);
            setMensaje('¡Inicio de sesión exitoso!');
        } catch (error) {
            setMensaje('Error: Credenciales incorrectas');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
            <h2>Bienvenido a tu Portal</h2>
            <form onSubmit={iniciarSesion} style={{ display: 'inline-block', textAlign: 'left', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Email: </label> <br />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ padding: '8px', width: '250px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold' }}>Contraseña: </label> <br />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ padding: '8px', width: '250px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Entrar
                </button>
            </form>
            <p style={{ color: mensaje.includes('Error') ? 'red' : 'green', marginTop: '20px', fontWeight: 'bold' }}>
                {mensaje}
            </p>
        </div>
    );
}