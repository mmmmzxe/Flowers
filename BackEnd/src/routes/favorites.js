const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');

// Get user's favorites
router.get('/', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('product')
      .sort('-createdAt');
    res.json({ success: true, data: favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to favorites
router.post('/:productId', auth, async (req, res) => {
  try {
    const favorite = new Favorite({
      user: req.user._id,
      product: req.params.productId
    });
    await favorite.save();
    await favorite.populate('product');
    res.json({ success: true, data: favorite });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Product already in favorites' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from favorites
router.delete('/:productId', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      product: req.params.productId
    });
    if (!favorite) {
      return res.status(404).json({ success: false, message: 'Favorite not found' });
    }
    res.json({ success: true, data: favorite });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router; 