const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const verifyRole = require('../middleware/verifyRole.js');
const verifyToken = require('../middleware/verifyToken.js');

router.post('/', verifyToken, verifyRole([1]), companyController.createCompany);
router.get('/', verifyToken, verifyRole([1]), companyController.getCompanies);
router.get('/:id', verifyToken, verifyRole([1]), companyController.getCompanyById);
router.put('/:id', verifyToken, verifyRole([1]), companyController.updateCompany);
router.delete('/:id', verifyToken, verifyRole([1]), companyController.deleteCompany);

module.exports = router;
