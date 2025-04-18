const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
    getProductById,
} = require('../controllers/products.controller');
const verifyRole = require('../middleware/verifyRole.js');
const verifyToken = require('../middleware/verifyToken.js');

// Crear un producto
router.post('/', verifyToken, verifyRole([1, 4]), createProduct);

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Obtener productos por categoría
router.get('/category/:categoryId', getProductsByCategory);

// Actualizar un producto
router.put('/:id', verifyToken, verifyRole([1, 4]), updateProduct);

// Eliminar un producto
router.delete('/:id', verifyToken, verifyRole([1, 4]), deleteProduct);

module.exports = router;
