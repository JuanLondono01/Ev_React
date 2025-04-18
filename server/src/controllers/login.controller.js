const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users.models');

// Función para el login de usuario
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario en la base de datos por el email
        const user = await User.findOne({ where: { email } });

        // Verificamos si el usuario existe
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Verificamos si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Creamos el JWT
        const payload = {
            userId: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.roleId,
        };

        // Generamos el token con una duración de 1 hora
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000,
        });

        // Respondemos con el token
        res.json({
            message: 'Login exitoso',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { login };
