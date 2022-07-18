const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    adminname: String,
    description: String,
    pricing: String,
    image: String,
    content: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const MenuPost = mongoose.model('MenuPost', PostSchema);

module.exports = MenuPost;