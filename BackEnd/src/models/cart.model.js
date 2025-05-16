const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Calculate total price before saving
cartSchema.pre('save', async function(next) {
    let total = 0;
    
    // Populate product details to get prices
    await this.populate('items.product');
    
    for (const item of this.items) {
        total += item.product.price * item.quantity;
    }
    
    this.totalPrice = total;
    next();
});

module.exports = mongoose.model('Cart', cartSchema); 