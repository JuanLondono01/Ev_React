const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roles.controller');
const verifyRole = require('../middleware/verifyRole.js');
const verifyToken = require('../middleware/verifyToken.js');

// Crear rol
router.post('/', verifyToken, verifyRole([1, 4]), roleController.createRole);

// Obtener todos los roles
router.get('/', verifyToken, verifyRole([1, 4]), roleController.getAllRoles);

// Obtener rol por ID
router.get('/:id', verifyToken, verifyRole([1, 4]), roleController.getRoleById);

// Actualizar rol
router.put('/:id', verifyToken, verifyRole([1, 4]), roleController.updateRole);

// Eliminar rol
router.delete('/:id', verifyToken, verifyRole([1, 4]), roleController.deleteRole);

module.exports = router;
