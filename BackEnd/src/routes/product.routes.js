const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/product.model');
const { protect, authorize } = require('../middleware/auth.middleware');

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'title');
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'title');
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/products
// @desc    Create product
// @access  Private/Admin
router.post('/', [
    protect,
    authorize('admin'),
    [
        body('title').trim().notEmpty().withMessage('Title is required'),
        body('mainImage').notEmpty().withMessage('Main image is required'),
        body('price').isNumeric().withMessage('Price must be a number'),
        body('description').trim().notEmpty().withMessage('Description is required'),
        body('category').isMongoId().withMessage('Valid category ID is required'),
        body('stock').isNumeric().withMessage('Stock must be a number')
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            data: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/:id', [
    protect,
    authorize('admin'),
    [
        body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
        body('price').optional().isNumeric().withMessage('Price must be a number'),
        body('category').optional().isMongoId().withMessage('Valid category ID is required')
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/:id', [protect, authorize('admin')], async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.remove();

        res.json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router; 