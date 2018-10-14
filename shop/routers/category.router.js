const express = require('express');
const router = express.Router();
const checkIfAdmin = require('../../middleware/checkIfAdmin');
const categoryController = require('../controllers/category.controller');

// Get categories
router.get('/', categoryController.getCategories);

// Create category
router.post('/', checkIfAdmin, categoryController.createCategory);

// Edit category
router.patch('/:categoryId', checkIfAdmin, categoryController.editCategory);

// Delete category
router.delete('/:categoryId', checkIfAdmin, categoryController.deleteCategory);

module.exports = router;