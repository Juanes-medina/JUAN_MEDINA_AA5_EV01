const conexion = require('../config/db');
const bcrypt = require('bcryptjs');

// Servicio para registrar un usuario
const registrarUsuario = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Validar datos
        if (!usuario || !password) {
            return res.status(400).json({
                error: 'El usuario y la contraseña son obligatorios'
            });
        }

        // Verificar si el usuario ya existe
        const [usuarioExiste] = await conexion.query(
            'SELECT * FROM usuarios WHERE usuario = ?',
            [usuario]
        );

        if (usuarioExiste.length > 0) {
            return res.status(400).json({
                error: 'El usuario ya existe'
            });
        }

        // Encriptar contraseña
        const passwordEncriptada = await bcrypt.hash(password, 10);

        // Guardar usuario
        await conexion.query(
            'INSERT INTO usuarios (usuario, password) VALUES (?, ?)',
            [usuario, passwordEncriptada]
        );

        res.json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error en el servidor'
        });
    }
};

// Servicio para iniciar sesión
const iniciarSesion = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Buscar usuario
        const [resultado] = await conexion.query(
            'SELECT * FROM usuarios WHERE usuario = ?',
            [usuario]
        );

        if (resultado.length === 0) {
            return res.status(401).json({
                error: 'Error en la autenticación'
            });
        }

        const usuarioEncontrado = resultado[0];

        // Comparar contraseña
        const passwordCorrecta = await bcrypt.compare(
            password,
            usuarioEncontrado.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                error: 'Error en la autenticación'
            });
        }

        res.json({
            mensaje: 'Autenticación satisfactoria'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error en el servidor'
        });
    }
};

module.exports = {
    registrarUsuario,
    iniciarSesion
};
