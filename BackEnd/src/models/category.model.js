const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a category title'],
        trim: true,
        unique: true,
        maxlength: [50, 'Title cannot be more than 50 characters']
    },
    image: {
        type: String,
        required: [true, 'Please provide a category image']
    },
    description: {
        type: String,
        required: [true, 'Please provide a category description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', categorySchema); 