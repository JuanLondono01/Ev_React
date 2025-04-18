const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login.controller');
const verifyToken = require('../middleware/verifyToken.js');

// Ruta de login
router.post('/', login);
router.get('/verify', verifyToken, (req, res) => {
    res.json({
        message: 'Token valido',
        user: req.user,
    });
});
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: 'Logout succesfully'})
});

module.exports = router;
