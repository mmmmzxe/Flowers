const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id })
            .populate('items.product', 'title price mainImage');

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [],
                totalPrice: 0
            });
        }

        res.json({
            success: true,
            data: cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   POST /api/cart/items
// @desc    Add item to cart
// @access  Private
router.post('/items', [
    protect,
    [
        body('productId').isMongoId().withMessage('Valid product ID is required'),
        body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if product is in stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough stock available'
            });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                items: [{ product: productId, quantity }],
                totalPrice: 0
            });
        } else {
            // Check if product already exists in cart
            const existingItem = cart.items.find(
                item => item.product.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            await cart.save();
        }

        // Populate product details
        await cart.populate('items.product', 'title price mainImage');

        res.json({
            success: true,
            data: cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/cart/items/:productId
// @desc    Update item quantity
// @access  Private
router.put('/items/:productId', [
    protect,
    [
        body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { quantity } = req.body;
        const { productId } = req.params;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if product is in stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough stock available'
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        // Find and update item quantity
        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        item.quantity = quantity;
        await cart.save();

        // Populate product details
        await cart.populate('items.product', 'title price mainImage');

        res.json({
            success: true,
            data: cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/cart/items/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/items/:productId', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        // Remove item from cart
        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        await cart.save();

        // Populate product details
        await cart.populate('items.product', 'title price mainImage');

        res.json({
            success: true,
            data: cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete('/', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.json({
            success: true,
            data: cart
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router; 