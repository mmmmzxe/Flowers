const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a product title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    mainImage: {
        type: String,
        required: [true, 'Please provide a main image']
    },
    subImages: [{
        type: String
    }],
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide a category']
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock quantity'],
        min: [0, 'Stock cannot be negative'],
        default: 0
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create index for better search performance
productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema); 