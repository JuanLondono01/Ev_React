const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require('../controllers/category.controller');
const verifyRole = require('../middleware/verifyRole.js');
const verifyToken = require('../middleware/verifyToken.js');

// Ruta para crear una categoría
router.post('/', verifyToken, verifyRole([1, 2]), createCategory);

// Ruta para obtener todas las categorías
router.get('/', getAllCategories);

// Ruta para obtener una categoría por su ID
router.get('/:id', getCategoryById);

// Ruta para actualizar una categoría
router.put('/:id', verifyToken, verifyRole([1, 2]), updateCategory);

// Ruta para eliminar una categoría
router.delete('/:id', verifyToken, verifyRole([1, 2]), deleteCategory);

module.exports = router;
