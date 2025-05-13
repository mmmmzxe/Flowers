const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const { protect, authorize } = require('../middleware/auth.middleware');

// Protect all admin routes
router.use(protect);
router.use(authorize('admin'));

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/admin/carts
// @desc    Get all carts
// @access  Private/Admin
router.get('/carts', async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate('user', 'name email')
            .populate('items.product', 'title price mainImage');

        res.json({
            success: true,
            count: carts.length,
            data: carts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/admin/stats
// @desc    Get system statistics
// @access  Private/Admin
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCarts = await Cart.countDocuments();
        const activeCarts = await Cart.countDocuments({ 'items.0': { $exists: true } });

        res.json({
            success: true,
            data: {
                totalUsers,
                totalCarts,
                activeCarts
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private/Admin
router.put('/users/:id/role', async (req, res) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router; 