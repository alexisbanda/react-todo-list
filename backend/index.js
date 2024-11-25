const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Permite manejar datos JSON en el cuerpo de las solicitudes

// Configuración de conexión a PostgreSQL
const pool = new Pool({
    user: 'user',          // Mismo usuario configurado en PostgreSQL
    host: 'postgres',      // Nombre del contenedor PostgreSQL definido en docker-compose.yml
    database: 'todos_db',  // Nombre de la base de datos
    password: 'password',  // Contraseña configurada en PostgreSQL
    port: 5432,            // Puerto de PostgreSQL
});

// Middleware para verificar el token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Endpoint para obtener todas las tareas
app.get('/api/todos', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para crear una nueva tarea
app.post('/api/todos', authenticateToken, async (req, res) => {
    const { text } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *',
            [text, false]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint DELETE para eliminar una tarea por id
app.delete('/api/todos/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;  // Obtiene el id de la tarea desde los parámetros de la URL
    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task not found' });  // Si no se encuentra la tarea, responde con 404
        }
        res.json({ message: 'Task deleted successfully' });  // Respuesta de éxito
    } catch (err) {
        res.status(500).json({ error: err.message });  // Manejo de errores
    }
});

// Endpoint PUT para marcar una tarea como completada
app.put('/api/todos/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    console.log(`Received PUT request for id: ${id}`);  // Debugging line

    try {
        const result = await pool.query(
            'UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);  // Log error for debugging
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hashea la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserta el nuevo usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para inicio de sesión
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca el usuario en la base de datos
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Verifica la contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        // Genera un token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
    console.log('Backend server running on port 5000');
});
