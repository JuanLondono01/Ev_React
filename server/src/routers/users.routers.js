const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const verifyRole = require('../middleware/verifyRole.js');
const verifyToken = require('../middleware/verifyToken.js');

// Crear usuario
router.post('/', verifyToken, verifyRole([1, 2]), userController.createUser);

// Obtener todos los usuarios
router.get('/', verifyToken, verifyRole([1, 2]), userController.getAllUsers);

// Obtener usuario por ID
router.get('/:id', verifyToken, verifyRole([1, 2]), userController.getUserById);

// Actualizar usuario
router.put('/:id', verifyToken, verifyRole([1, 2]), userController.updateUser);

// Eliminar usuario
router.delete('/:id', verifyToken, verifyRole([1, 2]), userController.deleteUser);

module.exports = router;
