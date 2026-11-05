const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://plataforma_e_user:NXoA57P8HmGlajD1dDJEMH5t14aKYlNv@dpg-dbmg49m1egvs73f8rk30-a.oregon-postgres.render.com/plataforma_e",
    ssl: { rejectUnauthorized: false }
});

const crearTabla = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log("¡Tabla de usuarios creada con éxito en la nube!");
    } catch (error) {
        console.error("Error al crear la tabla:", error);
    } finally {
        pool.end();
    }
};

crearTabla();